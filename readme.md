# Nodejs

- In software we perform two types of Operation
  - Non-blocking operations
  - Blocking operations
- Non-blocking operations:
  - Non-blocking refers to code that doesn't block execution.
  - any operations which are non-blocking in nature are performed in L1, L2 and L3 cache
  - bacically in RAM
  - number of cycles requires are very less
  - example : mathematical calculations
- Blocking operations:
  - number of cycles requires are millions
  - ex: data-base operations, file i/o operations, network operations
  - js engine is single threaded i.e- one execution stack in js

# How Nodejs Works

- In Nodejs we have event loop
- whenever we send request to nodejs these are rquest will be queued under Event Queues
- Event loop constantly monitor the event queue and also place each events/operations from event queue to execution stack
- If operation that was requested is non-blocking operation, then operation will be processed to execution stack and response will send back to the caller
- If operation that was requested is blocking operation, then event loop will handle this operation to worker threads, later onces the operation is completed in worker thread, then it will be queued back to execution stack where all the callback functions will be processed, Response will be send back to the caller
- Thus nodejs can easily handle blocking and non-blocking operations using its event-loop, event-queue and execution stack
- But why should we think of Nodejs cluster, bcoz- nodejs only uses single thread, even-though we hardware of multi-core machine, nodejs does not take full advantage of all the cores, As nodejs will only use one core.
