#!/usr/bin/env node

const http = require('http');
const https = require('https');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

async function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const client = urlObj.protocol === 'https:' ? https : http;
    
    const req = client.request(url, {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          data: data,
          headers: res.headers,
        });
      });
    });

    req.on('error', reject);
    
    if (options.body) {
      req.write(JSON.stringify(options.body));
    }
    
    req.end();
  });
}

async function runSmokeTests() {
  console.log('🔥 Running smoke tests...\n');
  
  const tests = [
    {
      name: 'Homepage',
      url: `${BASE_URL}/`,
      expectedStatus: 200,
    },
    {
      name: 'Consultants page',
      url: `${BASE_URL}/consultants`,
      expectedStatus: 200,
    },
    {
      name: 'Database check',
      url: `${BASE_URL}/internal/db-check`,
      expectedStatus: 200,
    },
    {
      name: 'Health check',
      url: `${BASE_URL}/internal/health`,
      expectedStatus: 200,
    },
  ];

  // Add Stripe test if environment variables exist
  if (process.env.STRIPE_SECRET_KEY && process.env.STRIPE_PUBLISHABLE_KEY) {
    tests.push({
      name: 'Stripe checkout (should fail without auth)',
      url: `${BASE_URL}/api/stripe/checkout`,
      method: 'POST',
      body: { amount: 25 },
      expectedStatus: 401,
    });
  }

  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    try {
      const response = await makeRequest(test.url, {
        method: test.method,
        body: test.body,
      });

      if (response.status === test.expectedStatus) {
        console.log(`✅ ${test.name}: PASS (${response.status})`);
        passed++;
      } else {
        console.log(`❌ ${test.name}: FAIL (expected ${test.expectedStatus}, got ${response.status})`);
        failed++;
      }
    } catch (error) {
      console.log(`❌ ${test.name}: ERROR (${error.message})`);
      failed++;
    }
  }

  console.log(`\n📊 Results: ${passed} passed, ${failed} failed`);
  
  if (failed > 0) {
    process.exit(1);
  } else {
    console.log('🎉 All smoke tests passed!');
  }
}

runSmokeTests().catch(console.error);