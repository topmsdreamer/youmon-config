export default () => {
    const appEnv = process.env && process.env.APP_ENV ? process.env.APP_ENV : undefined;
    let CONFIG = require("./app.json");
    CONFIG.expo.extra = { appEnv: appEnv, "eas": {
            "projectId": "3f6ac208-d516-4cc6-9f5f-c017bc25073d"
        }
    };
    CONFIG.expo.updates = {
        url: "https://u.expo.dev/3f6ac208-d516-4cc6-9f5f-c017bc25073d"
    };
    CONFIG.expo.runtimeVersion = {
        policy: "sdkVersion"
    };
    return CONFIG;
};
