import axios, {
    AxiosResponse,
    AxiosStatic
} from 'axios';


const Dev = 'https://gb9fb258fe17506-apexdb.adb.ap-seoul-1.oraclecloudapps.com/ords/twright';
const auth_key = '766614B7C9A901198F2F5630349ADB7A9DAFB63976AF64DBB8A775D3BCCBDDB1'

const DEV = 'https://gb9fb258fe17506-apexdb.adb.ap-seoul-1.oraclecloudapps.com/ords/twright/'

const get_url  = DEV + 'v1/twright/tests/'
const get_all_url = DEV + 'twright/v1/twright/tests'

async function getUrlList(): Promise < any[] > {
    let users: any[] = [];
    const response:any =  await axios.get(Dev+'/lists/lists/', {
        // headers: {
        //     Authorization: auth_key 
        // }
    })
    console.log(response.data)
    return response.data.items
}

async function getProjectUrlList(): Promise < any[] > {
    let users: any[] = [];
    const response:any =  await axios.get(Dev+'/lists/projects/', {
        // headers: {
        //     Authorization: auth_key 
        // }
    })
    console.log(response.data)
    return response.data.items
}

async function getCodeList(): Promise < any[] > {
    let users: any[] = [];
    const response:any =  await axios.get(Dev +'/lists/settings/', {
        // headers: {
        //     Authorization: auth_key 
        // }
    })
    console.log(response.data)
    return response.data.items
}

async function postApex(upJson: any):Promise < boolean > {
    const request_config = {
        headers: {
            "Content-Type": 'application/json',
            "Authorization": auth_key,
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        data: upJson
    };
    const response = await axios.post(Dev + '/results//lists/',  upJson, request_config);

    try {
        if (response.status === 200) { // response - object, eg { status: 200, message: 'OK' }
            console.log(response.data);
            return true;
        }
        return false;
    } catch (err) {
        console.error(err)
        return false;
    }
}

async function postApeResource(upJson: any):Promise < boolean > {
    const request_config = {
        headers: {
            "Content-Type": 'application/json',
            "Authorization": auth_key,
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        data: upJson
    };

    const response = await axios.post( Dev + '/local/resources/',  upJson, request_config);
    try {
        if (response.status === 200) { // response - object, eg { status: 200, message: 'OK' }
            console.log(response.data);
            return true;
        }
        return false;
    } catch (err) {
        console.error(err)
        return false;
    }
}


async function postDelApex(days: string):Promise < boolean > {
    const article = { days: days, Authorization : auth_key };
    const response = await axios.post(Dev +'/lists/settings/', article);
    try {
        if (response.status === 200) { // response - object, eg { status: 200, message: 'OK' }
            console.log(response.data);
            return true;
        }
        return false;
    } catch (err) {
        console.error(err)
        return false;
    }
}

async function postApexScreen(rid :string, upJson: any):Promise < boolean > {
    const request_config = {
        headers: {
            "Content-Type": 'application/json',
            "Authorization": auth_key,
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        data: upJson
    };
    const postUrl = Dev + '/v1/twright/logs/' + rid;
    console.log(postUrl, upJson)
    const response = await axios.post(postUrl, upJson, request_config);
    console.log(postUrl, upJson)
    try {
        if (response.status === 200) { // response - object, eg { status: 200, message: 'OK' }
            console.log(response.data);
            return true;
        }
        return false;
    } catch (err) {
        console.error(err)
        return false;
    }
}


async function getUid(uid: string): Promise < any[] > {
    let users: any[] = [];
    // userinfo_url = get_url + payment
    console.log(get_url + uid)
    const response:any =  await axios.get(get_url + uid, {
        // headers: {
        //     Authorization: auth_key
        // }
    })
    // console.log(response.data)
    return response.data
}

async function getUidAll(): Promise < any[] > {
    let users: any[] = [];

    // console.log(get_all_url)
    const response:any =  await axios.get(Dev + '/v1/twright/tests', {
        // headers: {
        //     Authorization: auth_key
        // }
    })
    console.log(response.data)
    return response.data.items
}


async function getMulitScreen(): Promise < any[] > {
    let users: any[] = [];

    // console.log(get_all_url)
    const response:any =  await axios.get(Dev + '/lists/lists/', {
        // headers: {
        //     Authorization: auth_key
        // }
    })
    console.log(response.data)
    return response.data.items
}

export {
    postApex,
    getUrlList,
    getProjectUrlList,
    getCodeList,
    postDelApex,
    postApeResource,
    postApexScreen,
    getUidAll,
    getUid,
    getMulitScreen
}

