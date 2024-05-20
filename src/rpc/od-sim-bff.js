import { ConfigServiceClient } from './generated/config_grpc_web_pb';
import { ConfigRequest } from './generated/config_pb';

const client = new ConfigServiceClient('http://localhost:8080');

const fetchConfig = () => {
    return new Promise((resolve, reject) => {
        const request = new ConfigRequest();

        client.getConfig(request, {}, (err, response) => {
            if (err) {
                console.error('Error:', err);
                reject(err);
            } else {
                try {
                    const config = JSON.parse(response.getConfigJson());
                    resolve(config);
                } catch (parseErr) {
                    console.error('Parsing error:', parseErr);
                    reject(parseErr);
                }
            }
        });
    });
};

export default fetchConfig;
