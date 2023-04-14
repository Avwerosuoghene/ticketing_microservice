export const natsWrapper = {
  client: {

    // This is to ensure a the callback functin is run during event publishing.
    publish: jest.fn().mockImplementation((subject: string, data: string, callback: () => void) => {
        callback();
    })
  },
};
