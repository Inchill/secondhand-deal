module.exports = {
    apps: [{
        env: {
            NODE_ENV: 'development',
            PORT: 3000
        },
        env_production: {
            NODE_ENV: 'production',
            PORT: 3000
        },
        kill_timeout: 10000,
        name: 'trading_server',
        script: './server/app.ts',
        wait_ready: true,
        watch: false,
        // watch: ['server']
        ignore_watch: ['node_modules'],
        watch_options: {
            'usePolling': true
        }
    }]
};