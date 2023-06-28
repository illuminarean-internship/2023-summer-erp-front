module.exports = {
    apps: Array.from({ length: 2 }, (_, i) => ({
        name: `nextjs-${i + 1}`,
        script: 'yarn',
        args: `start -p ${3000 + i}`,
        exec_mode: 'fork',
        watch: false,
        max_memory_restart: '300M',
        node_args: ['--max_old_space_size=300'],
    })),
};
