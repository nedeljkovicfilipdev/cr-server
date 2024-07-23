import { buildApp } from "./app"

const startServer = async () => {
    try {
        const app = await buildApp();
        const port = process.env.PORT;

        const server = app.listen(port, () => {
            console.log(`Server up and running on PORT ${port}`)
        });

        process.on('SIGINT', async function () {
            server.close(() => {
                console.log('Server closed');
                process.exit(0);
            });
        });
    } catch (error) {
        console.error('Error starting the server:', error);
        process.exit(1);
    }
};

startServer();
