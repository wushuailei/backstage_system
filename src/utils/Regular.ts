/**
 * @name Regular 正则校验
 */
class Regular {

    /**
     * @name usernamRegular 用户名正则
     */
    public usernamRegular: RegExp = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/;
    /**
     * @name passwordRegular 密码正则
     */
    public passwordRegular: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,32}$/;
    /**
     * @name emailRegular Email正则
     */
    public emailRegular: RegExp = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    /**
     * @name cardRegular 身份证正则
     */
    public cardRegular: RegExp = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
    /**
     * @name phoneRegular 电话号码正则
     */
    public phoneRegular: RegExp = /^1[3456789]\d{9}$/;

    /**
     * @name isUsernameLegitimate 帐号是否合法(字母开头，允许5-16字节，允许字母数字下划线)
     * @param username 用户名
     * @returns boolean
     */
    public isUsernameLegitimate(username: string): boolean {
        const reg = new RegExp(this.usernamRegular);
        return reg.test(username);
    }

    /**
     * @name isPasswordLegitimate 密码(必须包含大小写字母和数字的组合，不能使用特殊字符，长度在 8-10 之间)
     * @param password 密码
     * @returns boolean
     */
    public isPasswordLegitimate(password: string): boolean {
        const reg = new RegExp(this.passwordRegular);
        return reg.test(password);
    }

    /**
     * @name isEmailLegitimate Email地址
     * @param email Email地址
     * @returns boolean
     */
    public isEmailLegitimate(email: string): boolean {
        const reg = new RegExp(this.emailRegular);
        return reg.test(email);
    }

    /**
     * @name isPhoneLegitimate 电话号码
     * @param phone 电话号码
     * @returns boolean
     */
    public isPhoneLegitimate(phone: string): boolean {
        const reg = new RegExp(this.phoneRegular);
        return reg.test(phone);
    }

    /**
     * @name isCardLegitimate 身份证号码
     * @param card 身份证号码
     * @returns boolean
     */
    public isCardLegitimate(card: string): boolean {
        const reg = new RegExp(this.cardRegular);
        return reg.test(card);
    }
}

export default Regular;
