type UPnPDevicePayload = {
    address: string,
    headers: {
        '$': string,
        'CACHE-CONTROL': string,
        DATE: string,
        ST: string,
        USN: string,
        SERVER: string,
        LOCATION: string,
        'CONTENT-LENGTH': string
    },
    expire: number,
    dheaders: {
        'content-type': string,
        connection: string,
        'content-length': string,
        server: string,
        date: string,
        ext: string
    },
    description: {
        '$': {
            xmlns: string
        },
        specVersion: {
            major: string,
            minor: string
        },
        device: {
            deviceType: string,
            friendlyName: string,
            manufacturer: string,
            manufacturerURL: string,
            modelDescription: string,
            modelName: string,
            modelNumber: string,
            modelURL: string,
            serialNumber: string,
            UDN: string,
            'dlna:X_DLNADOC': {
                '_': string,
                '$': {
                    'xmlns:dlna': string
                }
            },
            presentationURL: string,
            iconList: {
                [icon: string]: [
                    {
                        mimetype: string,
                        width: string,
                        height: string,
                        depth: string,
                        url: string
                    }[]
                ]
            },
            serviceList: {
                [service: string]: {
                    serviceType: string,
                    serviceId: string,
                    controlURL: string,
                    eventSubURL: string,
                    SCPDURL: string
                }[]
            }
        }
    },
    descriptionXML: string
};

export default UPnPDevicePayload;