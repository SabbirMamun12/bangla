# banglapuzzle-API-performance-testing using JMeter

This repository contains performance reports and scripts for the site  [BANGLAPUZZLE](https://www.banglapuzzle.com/). This performance testing was conducted using Apache JMeter to evaluate the system's capability to how many concurrent requests were handled and then measure its performance under different loads.

# Following tests were performed:

I’ve completed performance test on frequently used API for test site [BANGLAPUZZLE](https://www.banglapuzzle.com/). 

**6 Concurrent Request with 2 Loop Count**

Avg TPS for Total Samples is ~ 16.5

Total Concurrent API requested: 2352.

**8 Concurrent Request with 2 Loop Count**

Avg TPS for Total Samples is ~ 15.3

Total Concurrent API requested: 3136.

**10 Concurrent Request with 2 Loop Count**

Avg TPS for Total Samples is ~ 19

Total Concurrent API requested: 3920.

**12 Concurrent Request with 2 Loop Count**

Avg TPS for Total Samples is ~ 17.6

Total Concurrent API requested: 4699.

**14 Concurrent Request with 2 Loop Count**

Avg TPS for Total Samples is ~ 17.6

Total Concurrent API requested: 5483.

**14 Concurrent Request with 2 Loop Count observe for 60 sec**

Avg TPS for Total Samples is ~ 19

Total Concurrent API requested: 6378.

# Result
During the test execution with 14 concurrent requests, 19 requests experienced assertion fails, 11 requests experienced connection pool shut down, resulting in an error rate of 0.82%.

Hold the normal load for 60 sec, during the test execution with 14 concurrent requests, 53 requests experienced assertion fails, 18 requests experienced connection timeouts, resulting in an error rate of 1.78%.

# Summary

The performance test results indicate that the BANGLAPUZZLE can handle approximately 5500  API calls with an error rate close to zero

Hold the normal load for 50 sec test results indicate that the BANGLAPUZZLE can handle approximately 6200 API calls with an error rate close to zero
