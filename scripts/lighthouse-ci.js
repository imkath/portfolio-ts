#!/usr/bin/env node

/**
 * Lighthouse Performance Test
 * Checks LCP and CLS budgets with slow 4G simulation
 */

const lighthouse = require("lighthouse");
const chromeLauncher = require("chrome-launcher");
const fs = require("fs");
const path = require("path");

// Performance budgets
const BUDGETS = {
  LCP: 2000, // 2.0s - Largest Contentful Paint
  CLS: 0.05, // 0.05 - Cumulative Layout Shift
  FCP: 1800, // 1.8s - First Contentful Paint
  TBT: 200, // 200ms - Total Blocking Time
};

// Pages to test
const PAGES = [
  { name: "Home", path: "/" },
  { name: "Work", path: "/work" },
  { name: "About", path: "/about" },
];

async function runLighthouse(url, opts = {}, config = null) {
  const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless"] });
  opts.port = chrome.port;

  const runnerResult = await lighthouse(url, opts, config);

  await chrome.kill();

  return runnerResult;
}

async function testPage(baseUrl, page) {
  const url = `${baseUrl}${page.path}`;
  console.log(`\n🔍 Testing: ${page.name} (${url})`);

  const opts = {
    // Slow 4G throttling
    throttling: {
      rttMs: 150,
      throughputKbps: 1638.4,
      cpuSlowdownMultiplier: 4,
      requestLatencyMs: 150,
      downloadThroughputKbps: 1638.4,
      uploadThroughputKbps: 675,
    },
    // Mobile emulation
    formFactor: "mobile",
    screenEmulation: {
      mobile: true,
      width: 375,
      height: 667,
      deviceScaleFactor: 2,
      disabled: false,
    },
  };

  const config = {
    extends: "lighthouse:default",
    settings: {
      onlyCategories: ["performance"],
    },
  };

  const runnerResult = await runLighthouse(url, opts, config);
  const lhr = runnerResult.lhr;

  // Extract metrics
  const metrics = {
    lcp: lhr.audits["largest-contentful-paint"].numericValue,
    cls: lhr.audits["cumulative-layout-shift"].numericValue,
    fcp: lhr.audits["first-contentful-paint"].numericValue,
    tbt: lhr.audits["total-blocking-time"].numericValue,
    performanceScore: lhr.categories.performance.score * 100,
  };

  // Check budgets
  const results = {
    page: page.name,
    url,
    metrics,
    passed: true,
    failures: [],
  };

  if (metrics.lcp > BUDGETS.LCP) {
    results.passed = false;
    results.failures.push(
      `LCP: ${Math.round(metrics.lcp)}ms > ${BUDGETS.LCP}ms`
    );
  }

  if (metrics.cls > BUDGETS.CLS) {
    results.passed = false;
    results.failures.push(`CLS: ${metrics.cls.toFixed(3)} > ${BUDGETS.CLS}`);
  }

  if (metrics.fcp > BUDGETS.FCP) {
    results.passed = false;
    results.failures.push(
      `FCP: ${Math.round(metrics.fcp)}ms > ${BUDGETS.FCP}ms`
    );
  }

  if (metrics.tbt > BUDGETS.TBT) {
    results.passed = false;
    results.failures.push(
      `TBT: ${Math.round(metrics.tbt)}ms > ${BUDGETS.TBT}ms`
    );
  }

  // Print results
  console.log(
    `  Performance Score: ${Math.round(metrics.performanceScore)}/100`
  );
  console.log(
    `  LCP: ${Math.round(metrics.lcp)}ms (budget: ${BUDGETS.LCP}ms) ${
      metrics.lcp <= BUDGETS.LCP ? "✓" : "✗"
    }`
  );
  console.log(
    `  CLS: ${metrics.cls.toFixed(3)} (budget: ${BUDGETS.CLS}) ${
      metrics.cls <= BUDGETS.CLS ? "✓" : "✗"
    }`
  );
  console.log(
    `  FCP: ${Math.round(metrics.fcp)}ms (budget: ${BUDGETS.FCP}ms) ${
      metrics.fcp <= BUDGETS.FCP ? "✓" : "✗"
    }`
  );
  console.log(
    `  TBT: ${Math.round(metrics.tbt)}ms (budget: ${BUDGETS.TBT}ms) ${
      metrics.tbt <= BUDGETS.TBT ? "✓" : "✗"
    }`
  );

  if (!results.passed) {
    console.log(`  ❌ FAILED: ${results.failures.join(", ")}`);
  } else {
    console.log(`  ✅ PASSED`);
  }

  return results;
}

async function main() {
  const baseUrl = process.env.BASE_URL || "http://localhost:3002";

  console.log("🚀 Lighthouse Performance Testing");
  console.log(`📊 Budgets: LCP < ${BUDGETS.LCP}ms, CLS < ${BUDGETS.CLS}`);
  console.log(`🌐 Base URL: ${baseUrl}`);
  console.log(`📱 Simulating: Slow 4G`);

  const allResults = [];

  for (const page of PAGES) {
    try {
      const result = await testPage(baseUrl, page);
      allResults.push(result);
    } catch (error) {
      console.error(`❌ Error testing ${page.name}:`, error.message);
      allResults.push({
        page: page.name,
        passed: false,
        failures: [error.message],
      });
    }
  }

  // Summary
  console.log("\n" + "=".repeat(60));
  console.log("📋 SUMMARY");
  console.log("=".repeat(60));

  const passedCount = allResults.filter((r) => r.passed).length;
  const totalCount = allResults.length;

  console.log(`\n${passedCount}/${totalCount} pages passed`);

  allResults.forEach((result) => {
    const status = result.passed ? "✅" : "❌";
    console.log(`${status} ${result.page}`);
    if (!result.passed) {
      result.failures.forEach((failure) => {
        console.log(`   - ${failure}`);
      });
    }
  });

  // Exit with error if any test failed
  if (passedCount < totalCount) {
    console.log("\n❌ Some performance tests failed");
    process.exit(1);
  } else {
    console.log("\n✅ All performance tests passed");
    process.exit(0);
  }
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
