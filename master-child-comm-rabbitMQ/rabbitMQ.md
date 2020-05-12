# List Queues

- Go to path: C:\Program Files\RabbitMQ\rabbitmq_server-3.8.3\sbin
- Open the path in command prompt and type a command: rabbitmqctl list_queues
- Using this command you will see all the queues from RabbitMQ

# Using RabbitMQ Web Interface

- To see all the queues and their details, we can use RabbitMQ web interface-
  - open web interface, open a browser and type belwo URL: http://localhost:15672
- It will open web interface. The user Id is guest and password is guest

# Architecture

- PM2 is used to manage our processes
- PM2 will create 2 process (Express App Instance 1 & 2) which is reponsible for accepting the request, this 2 process will act as producers
- When these 2 process recieve the request it will be stored in RabbitMQ
- PM2 also will create 2 process (Worker -1 & 2) which will be consumer of rabbitMQ queues, who will recieve messages from our queues.
- architecture diagram : rabbitMQ-PM2.png

---

# Steps to run

Terminal-1

- cd master-child-comm-rabbitMQ
- pm2 start ecosystem.config.js
- pm2 monit

Terminal-2

- loadtest -n 1000 -c 100 --rps 100 http://localhost:3000?number=20

Terminal-3

- (To Stop one of the worker) \$ pm2 stop Worker1 [NOTE: this worker will not recieve any message from the queue]

Terminal-4

- C:\Program Files\RabbitMQ\rabbitmq_server-3.8.3\sbin> rabbitmqctl list_queues
- pm2 start Worker1
- C:\Program Files\RabbitMQ\rabbitmq_server-3.8.3\sbin> rabbitmqctl list_queues

[Instead of listing queues --> Use RabbitMQ web interface to view the list ]

- docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.8.3-management
- http://127.0.0.1:15672/
- Queues tab to view all the queues
