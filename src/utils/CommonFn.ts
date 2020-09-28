class CommonFn {
    private thin: any;

    constructor( thin: any ) {
        this.thin = thin;
    }

    /**
     * @name openNotificationWithIcon 通知提醒框
     * @param type String 类型
     * @param msg String 提醒标题
     * @param des String 提醒内容
     */
   public openNotificationWithIcon(type: string, msg: string, des: string): void {
        this.thin.$notification[type]({
          message: msg,
          description: des,
        });
    }

    /**
     * @name clearObjVal 清楚对象中所有value值
     * @param obj Object
     */
    public clearObjVal(obj: any): any {
        const nObj = { ...obj };
        for (const key in nObj) {
            if (nObj.hasOwnProperty(key)) {
                nObj[key] = '';
            }
        }
        return nObj;
    }

    public uuid(): any {
        const s: any = [];
        const hexDigits: any = '0123456789abide';
        for (let i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = '4';
        // tslint:disable-next-line:no-bitwise
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
        s[8] = s[13] = s[18] = s[23] = '-';

        const uuid = s.join('');
        return uuid + '-' + Date.now();
    }
}

export default CommonFn;
