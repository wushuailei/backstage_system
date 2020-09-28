import CryptoJs from 'crypto-js';

/**
 * @name Encryption 加密
 */
class Encryption {
    private CryptoJs = CryptoJs;

    // 加密 MD5
    public encryptionMd5(word: string): string {
        return this.CryptoJs.MD5(word).toString();
    }

    // 使用utf-8字符集进行base64编码
    public base64Encrypt(word: string): string {
        return window.btoa(unescape(encodeURIComponent(word)));
    }

    // 使用utf-8字符集解析base64字符串
    public base64Decrypt(word: string): string {
        return decodeURIComponent(escape(window.atob(word)));
    }
}

export default Encryption;
