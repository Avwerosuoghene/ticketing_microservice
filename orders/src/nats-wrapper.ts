import nats, { Stan } from "node-nats-streaming";

class NatsWrapper {

    // Adding _ and ? tells typescript this variable might remain undefined for some timeß
    private _client?: Stan;

    get client() {
      if(!this._client) {
        throw new Error('Cannot access NATS client before connecting');
      }  
      return this._client;
    }

    connect(clusterId: string, clientId: string, url: string) {
        this._client = nats.connect(clusterId, clientId, {url});

        return new Promise<void>((resolve, reject) => {
            this.client!.on('connect', () => {
                console.log('Orders connected to NATS true');
                resolve();
            });
            this.client!.on('error', (err) => {
                reject(err);
            })
        })
       
    }
}

// This single instance of the class will be shared among all required files.
export const natsWrapper = new NatsWrapper();
