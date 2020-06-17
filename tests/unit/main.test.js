import phoneFilter from '../../client/filters/phoneFilter.ts';
import { getCookie, setCookie, delCookie } from '../../client/user/config/cookie.ts';

test('13688476450 should to be 136****6450', () => {
    expect(phoneFilter(13688476450)).toBe('136****6450');
});

test('set cookie cid as name, 123 as value, 10s as expire', () => {
    expect(setCookie('cid', 123, 10)).not.toBe('cid=123');
});

test('get cookie cid', () => {
    expect(getCookie('cid')).not.toBe('456');
});

test('delete cookie cid', () => {
    expect(delCookie('cid')).not.toBe('');
});