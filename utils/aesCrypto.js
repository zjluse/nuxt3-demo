import utf8 from 'crypto-js/enc-utf8';
import hex from 'crypto-js/enc-hex';
import aes from 'crypto-js/aes';
import ecb from 'crypto-js/mode-ecb';
import pkcs7 from 'crypto-js/pad-pkcs7';

export const aesEncrypt = (value) => {
  const key = useRuntimeConfig().public.APP_ENCRYPTKEY;
  
  let sKey = utf8.parse(key);
  let sValue = utf8.parse(value);

  let result = aes.encrypt(sValue, sKey, { mode: ecb, padding: pkcs7, iv: '' });
  return result.ciphertext.toString()
}

export const aesDecrypt = (value) => {
  const key = useRuntimeConfig().public.APP_ENCRYPTKEY;
  
  // let sKey = hex.parse(key);
  let sValue = hex.parse(value);
  let sKey = utf8.parse(key);
  // let sValue = utf8.parse(value);

  let result = aes.decrypt(value, sKey, { mode: ecb, padding: pkcs7, iv: '' });
  return result.toString(utf8)
}

export default {
  aesEncrypt,
  aesDecrypt
}
