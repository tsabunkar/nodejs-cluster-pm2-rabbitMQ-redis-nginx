module.exports = {
  apps: [
    {
      name: 'Express App',
      script: 'server.js',
      instances: 'MAX',
      autorestart: true,
      watch: true,
      max_memory_restart: '1G',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],

  deploy: {
    production: {
      user: 'SSH_USERNAME',
      host: 'SSH_HOSTMACHINE',
      ref: 'origin/master',
      repo: 'GIT_REPOSITORY',
      path: 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy':
        'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
    },
  },
};

/**
 * instances -> MAX : use all the cores avaliable
 * autorestart -> true: PM2 will auto-restart if any file changes
 * exec_mode -> Telling PM2 to execute in cluster mode
 * max_memory_restart -> 1 GB
 */
