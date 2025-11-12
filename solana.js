(() => {
  var t = {
      742: (t, e) => {
        'use strict';
        (e.byteLength = function (t) {
          var e = f(t),
            r = e[0],
            n = e[1];
          return (3 * (r + n)) / 4 - n;
        }),
          (e.toByteArray = function (t) {
            var e,
              r,
              i = f(t),
              s = i[0],
              a = i[1],
              u = new o(
                (function (t, e, r) {
                  return (3 * (e + r)) / 4 - r;
                })(0, s, a)
              ),
              c = 0,
              l = a > 0 ? s - 4 : s;
            for (r = 0; r < l; r += 4)
              (e =
                (n[t.charCodeAt(r)] << 18) |
                (n[t.charCodeAt(r + 1)] << 12) |
                (n[t.charCodeAt(r + 2)] << 6) |
                n[t.charCodeAt(r + 3)]),
                (u[c++] = (e >> 16) & 255),
                (u[c++] = (e >> 8) & 255),
                (u[c++] = 255 & e);
            return (
              2 === a && ((e = (n[t.charCodeAt(r)] << 2) | (n[t.charCodeAt(r + 1)] >> 4)), (u[c++] = 255 & e)),
              1 === a &&
                ((e = (n[t.charCodeAt(r)] << 10) | (n[t.charCodeAt(r + 1)] << 4) | (n[t.charCodeAt(r + 2)] >> 2)),
                (u[c++] = (e >> 8) & 255),
                (u[c++] = 255 & e)),
              u
            );
          }),
          (e.fromByteArray = function (t) {
            for (var e, n = t.length, o = n % 3, i = [], s = 16383, f = 0, u = n - o; f < u; f += s)
              i.push(a(t, f, f + s > u ? u : f + s));
            return (
              1 === o
                ? ((e = t[n - 1]), i.push(r[e >> 2] + r[(e << 4) & 63] + '=='))
                : 2 === o &&
                  ((e = (t[n - 2] << 8) + t[n - 1]), i.push(r[e >> 10] + r[(e >> 4) & 63] + r[(e << 2) & 63] + '=')),
              i.join('')
            );
          });
        for (
          var r = [],
            n = [],
            o = 'undefined' != typeof Uint8Array ? Uint8Array : Array,
            i = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
            s = 0;
          s < 64;
          ++s
        )
          (r[s] = i[s]), (n[i.charCodeAt(s)] = s);
        function f(t) {
          var e = t.length;
          if (e % 4 > 0) throw new Error('Invalid string. Length must be a multiple of 4');
          var r = t.indexOf('=');
          return -1 === r && (r = e), [r, r === e ? 0 : 4 - (r % 4)];
        }
        function a(t, e, n) {
          for (var o, i, s = [], f = e; f < n; f += 3)
            (o = ((t[f] << 16) & 16711680) + ((t[f + 1] << 8) & 65280) + (255 & t[f + 2])),
              s.push(r[((i = o) >> 18) & 63] + r[(i >> 12) & 63] + r[(i >> 6) & 63] + r[63 & i]);
          return s.join('');
        }
        (n['-'.charCodeAt(0)] = 62), (n['_'.charCodeAt(0)] = 63);
      },
      764: (t, e, r) => {
        'use strict';
        const n = r(742),
          o = r(645),
          i =
            'function' == typeof Symbol && 'function' == typeof Symbol.for
              ? Symbol.for('nodejs.util.inspect.custom')
              : null;
        (e.lW = a), (e.h2 = 50);
        const s = 2147483647;
        function f(t) {
          if (t > s) throw new RangeError('The value "' + t + '" is invalid for option "size"');
          const e = new Uint8Array(t);
          return Object.setPrototypeOf(e, a.prototype), e;
        }
        function a(t, e, r) {
          if ('number' == typeof t) {
            if ('string' == typeof e)
              throw new TypeError('The "string" argument must be of type string. Received type number');
            return l(t);
          }
          return u(t, e, r);
        }
        function u(t, e, r) {
          if ('string' == typeof t)
            return (function (t, e) {
              if ((('string' == typeof e && '' !== e) || (e = 'utf8'), !a.isEncoding(e)))
                throw new TypeError('Unknown encoding: ' + e);
              const r = 0 | d(t, e);
              let n = f(r);
              const o = n.write(t, e);
              return o !== r && (n = n.slice(0, o)), n;
            })(t, e);
          if (ArrayBuffer.isView(t))
            return (function (t) {
              if (J(t, Uint8Array)) {
                const e = new Uint8Array(t);
                return p(e.buffer, e.byteOffset, e.byteLength);
              }
              return h(t);
            })(t);
          if (null == t)
            throw new TypeError(
              'The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type ' +
                typeof t
            );
          if (J(t, ArrayBuffer) || (t && J(t.buffer, ArrayBuffer))) return p(t, e, r);
          if (
            'undefined' != typeof SharedArrayBuffer &&
            (J(t, SharedArrayBuffer) || (t && J(t.buffer, SharedArrayBuffer)))
          )
            return p(t, e, r);
          if ('number' == typeof t)
            throw new TypeError('The "value" argument must not be of type number. Received type number');
          const n = t.valueOf && t.valueOf();
          if (null != n && n !== t) return a.from(n, e, r);
          const o = (function (t) {
            if (a.isBuffer(t)) {
              const e = 0 | y(t.length),
                r = f(e);
              return 0 === r.length || t.copy(r, 0, 0, e), r;
            }
            return void 0 !== t.length
              ? 'number' != typeof t.length || H(t.length)
                ? f(0)
                : h(t)
              : 'Buffer' === t.type && Array.isArray(t.data)
              ? h(t.data)
              : void 0;
          })(t);
          if (o) return o;
          if ('undefined' != typeof Symbol && null != Symbol.toPrimitive && 'function' == typeof t[Symbol.toPrimitive])
            return a.from(t[Symbol.toPrimitive]('string'), e, r);
          throw new TypeError(
            'The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type ' +
              typeof t
          );
        }
        function c(t) {
          if ('number' != typeof t) throw new TypeError('"size" argument must be of type number');
          if (t < 0) throw new RangeError('The value "' + t + '" is invalid for option "size"');
        }
        function l(t) {
          return c(t), f(t < 0 ? 0 : 0 | y(t));
        }
        function h(t) {
          const e = t.length < 0 ? 0 : 0 | y(t.length),
            r = f(e);
          for (let n = 0; n < e; n += 1) r[n] = 255 & t[n];
          return r;
        }
        function p(t, e, r) {
          if (e < 0 || t.byteLength < e) throw new RangeError('"offset" is outside of buffer bounds');
          if (t.byteLength < e + (r || 0)) throw new RangeError('"length" is outside of buffer bounds');
          let n;
          return (
            (n =
              void 0 === e && void 0 === r
                ? new Uint8Array(t)
                : void 0 === r
                ? new Uint8Array(t, e)
                : new Uint8Array(t, e, r)),
            Object.setPrototypeOf(n, a.prototype),
            n
          );
        }
        function y(t) {
          if (t >= s)
            throw new RangeError('Attempt to allocate Buffer larger than maximum size: 0x' + s.toString(16) + ' bytes');
          return 0 | t;
        }
        function d(t, e) {
          if (a.isBuffer(t)) return t.length;
          if (ArrayBuffer.isView(t) || J(t, ArrayBuffer)) return t.byteLength;
          if ('string' != typeof t)
            throw new TypeError(
              'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof t
            );
          const r = t.length,
            n = arguments.length > 2 && !0 === arguments[2];
          if (!n && 0 === r) return 0;
          let o = !1;
          for (;;)
            switch (e) {
              case 'ascii':
              case 'latin1':
              case 'binary':
                return r;
              case 'utf8':
              case 'utf-8':
                return q(t).length;
              case 'ucs2':
              case 'ucs-2':
              case 'utf16le':
              case 'utf-16le':
                return 2 * r;
              case 'hex':
                return r >>> 1;
              case 'base64':
                return V(t).length;
              default:
                if (o) return n ? -1 : q(t).length;
                (e = ('' + e).toLowerCase()), (o = !0);
            }
        }
        function g(t, e, r) {
          let n = !1;
          if (((void 0 === e || e < 0) && (e = 0), e > this.length)) return '';
          if (((void 0 === r || r > this.length) && (r = this.length), r <= 0)) return '';
          if ((r >>>= 0) <= (e >>>= 0)) return '';
          for (t || (t = 'utf8'); ; )
            switch (t) {
              case 'hex':
                return T(this, e, r);
              case 'utf8':
              case 'utf-8':
                return O(this, e, r);
              case 'ascii':
                return P(this, e, r);
              case 'latin1':
              case 'binary':
                return U(this, e, r);
              case 'base64':
                return I(this, e, r);
              case 'ucs2':
              case 'ucs-2':
              case 'utf16le':
              case 'utf-16le':
                return R(this, e, r);
              default:
                if (n) throw new TypeError('Unknown encoding: ' + t);
                (t = (t + '').toLowerCase()), (n = !0);
            }
        }
        function w(t, e, r) {
          const n = t[e];
          (t[e] = t[r]), (t[r] = n);
        }
        function b(t, e, r, n, o) {
          if (0 === t.length) return -1;
          if (
            ('string' == typeof r
              ? ((n = r), (r = 0))
              : r > 2147483647
              ? (r = 2147483647)
              : r < -2147483648 && (r = -2147483648),
            H((r = +r)) && (r = o ? 0 : t.length - 1),
            r < 0 && (r = t.length + r),
            r >= t.length)
          ) {
            if (o) return -1;
            r = t.length - 1;
          } else if (r < 0) {
            if (!o) return -1;
            r = 0;
          }
          if (('string' == typeof e && (e = a.from(e, n)), a.isBuffer(e)))
            return 0 === e.length ? -1 : m(t, e, r, n, o);
          if ('number' == typeof e)
            return (
              (e &= 255),
              'function' == typeof Uint8Array.prototype.indexOf
                ? o
                  ? Uint8Array.prototype.indexOf.call(t, e, r)
                  : Uint8Array.prototype.lastIndexOf.call(t, e, r)
                : m(t, [e], r, n, o)
            );
          throw new TypeError('val must be string, number or Buffer');
        }
        function m(t, e, r, n, o) {
          let i,
            s = 1,
            f = t.length,
            a = e.length;
          if (
            void 0 !== n &&
            ('ucs2' === (n = String(n).toLowerCase()) || 'ucs-2' === n || 'utf16le' === n || 'utf-16le' === n)
          ) {
            if (t.length < 2 || e.length < 2) return -1;
            (s = 2), (f /= 2), (a /= 2), (r /= 2);
          }
          function u(t, e) {
            return 1 === s ? t[e] : t.readUInt16BE(e * s);
          }
          if (o) {
            let n = -1;
            for (i = r; i < f; i++)
              if (u(t, i) === u(e, -1 === n ? 0 : i - n)) {
                if ((-1 === n && (n = i), i - n + 1 === a)) return n * s;
              } else -1 !== n && (i -= i - n), (n = -1);
          } else
            for (r + a > f && (r = f - a), i = r; i >= 0; i--) {
              let r = !0;
              for (let n = 0; n < a; n++)
                if (u(t, i + n) !== u(e, n)) {
                  r = !1;
                  break;
                }
              if (r) return i;
            }
          return -1;
        }
        function _(t, e, r, n) {
          r = Number(r) || 0;
          const o = t.length - r;
          n ? (n = Number(n)) > o && (n = o) : (n = o);
          const i = e.length;
          let s;
          for (n > i / 2 && (n = i / 2), s = 0; s < n; ++s) {
            const n = parseInt(e.substr(2 * s, 2), 16);
            if (H(n)) return s;
            t[r + s] = n;
          }
          return s;
        }
        function v(t, e, r, n) {
          return Y(q(e, t.length - r), t, r, n);
        }
        function E(t, e, r, n) {
          return Y(
            (function (t) {
              const e = [];
              for (let r = 0; r < t.length; ++r) e.push(255 & t.charCodeAt(r));
              return e;
            })(e),
            t,
            r,
            n
          );
        }
        function B(t, e, r, n) {
          return Y(V(e), t, r, n);
        }
        function A(t, e, r, n) {
          return Y(
            (function (t, e) {
              let r, n, o;
              const i = [];
              for (let s = 0; s < t.length && !((e -= 2) < 0); ++s)
                (r = t.charCodeAt(s)), (n = r >> 8), (o = r % 256), i.push(o), i.push(n);
              return i;
            })(e, t.length - r),
            t,
            r,
            n
          );
        }
        function I(t, e, r) {
          return 0 === e && r === t.length ? n.fromByteArray(t) : n.fromByteArray(t.slice(e, r));
        }
        function O(t, e, r) {
          r = Math.min(t.length, r);
          const n = [];
          let o = e;
          for (; o < r; ) {
            const e = t[o];
            let i = null,
              s = e > 239 ? 4 : e > 223 ? 3 : e > 191 ? 2 : 1;
            if (o + s <= r) {
              let r, n, f, a;
              switch (s) {
                case 1:
                  e < 128 && (i = e);
                  break;
                case 2:
                  (r = t[o + 1]), 128 == (192 & r) && ((a = ((31 & e) << 6) | (63 & r)), a > 127 && (i = a));
                  break;
                case 3:
                  (r = t[o + 1]),
                    (n = t[o + 2]),
                    128 == (192 & r) &&
                      128 == (192 & n) &&
                      ((a = ((15 & e) << 12) | ((63 & r) << 6) | (63 & n)),
                      a > 2047 && (a < 55296 || a > 57343) && (i = a));
                  break;
                case 4:
                  (r = t[o + 1]),
                    (n = t[o + 2]),
                    (f = t[o + 3]),
                    128 == (192 & r) &&
                      128 == (192 & n) &&
                      128 == (192 & f) &&
                      ((a = ((15 & e) << 18) | ((63 & r) << 12) | ((63 & n) << 6) | (63 & f)),
                      a > 65535 && a < 1114112 && (i = a));
              }
            }
            null === i
              ? ((i = 65533), (s = 1))
              : i > 65535 && ((i -= 65536), n.push(((i >>> 10) & 1023) | 55296), (i = 56320 | (1023 & i))),
              n.push(i),
              (o += s);
          }
          return (function (t) {
            const e = t.length;
            if (e <= S) return String.fromCharCode.apply(String, t);
            let r = '',
              n = 0;
            for (; n < e; ) r += String.fromCharCode.apply(String, t.slice(n, (n += S)));
            return r;
          })(n);
        }
        (a.TYPED_ARRAY_SUPPORT = (function () {
          try {
            const t = new Uint8Array(1),
              e = {
                foo: function () {
                  return 42;
                },
              };
            return Object.setPrototypeOf(e, Uint8Array.prototype), Object.setPrototypeOf(t, e), 42 === t.foo();
          } catch (t) {
            return !1;
          }
        })()),
          a.TYPED_ARRAY_SUPPORT ||
            'undefined' == typeof console ||
            'function' != typeof console.error ||
            console.error(
              'This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
            ),
          Object.defineProperty(a.prototype, 'parent', {
            enumerable: !0,
            get: function () {
              if (a.isBuffer(this)) return this.buffer;
            },
          }),
          Object.defineProperty(a.prototype, 'offset', {
            enumerable: !0,
            get: function () {
              if (a.isBuffer(this)) return this.byteOffset;
            },
          }),
          (a.poolSize = 8192),
          (a.from = function (t, e, r) {
            return u(t, e, r);
          }),
          Object.setPrototypeOf(a.prototype, Uint8Array.prototype),
          Object.setPrototypeOf(a, Uint8Array),
          (a.alloc = function (t, e, r) {
            return (function (t, e, r) {
              return (
                c(t), t <= 0 ? f(t) : void 0 !== e ? ('string' == typeof r ? f(t).fill(e, r) : f(t).fill(e)) : f(t)
              );
            })(t, e, r);
          }),
          (a.allocUnsafe = function (t) {
            return l(t);
          }),
          (a.allocUnsafeSlow = function (t) {
            return l(t);
          }),
          (a.isBuffer = function (t) {
            return null != t && !0 === t._isBuffer && t !== a.prototype;
          }),
          (a.compare = function (t, e) {
            if (
              (J(t, Uint8Array) && (t = a.from(t, t.offset, t.byteLength)),
              J(e, Uint8Array) && (e = a.from(e, e.offset, e.byteLength)),
              !a.isBuffer(t) || !a.isBuffer(e))
            )
              throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
            if (t === e) return 0;
            let r = t.length,
              n = e.length;
            for (let o = 0, i = Math.min(r, n); o < i; ++o)
              if (t[o] !== e[o]) {
                (r = t[o]), (n = e[o]);
                break;
              }
            return r < n ? -1 : n < r ? 1 : 0;
          }),
          (a.isEncoding = function (t) {
            switch (String(t).toLowerCase()) {
              case 'hex':
              case 'utf8':
              case 'utf-8':
              case 'ascii':
              case 'latin1':
              case 'binary':
              case 'base64':
              case 'ucs2':
              case 'ucs-2':
              case 'utf16le':
              case 'utf-16le':
                return !0;
              default:
                return !1;
            }
          }),
          (a.concat = function (t, e) {
            if (!Array.isArray(t)) throw new TypeError('"list" argument must be an Array of Buffers');
            if (0 === t.length) return a.alloc(0);
            let r;
            if (void 0 === e) for (e = 0, r = 0; r < t.length; ++r) e += t[r].length;
            const n = a.allocUnsafe(e);
            let o = 0;
            for (r = 0; r < t.length; ++r) {
              let e = t[r];
              if (J(e, Uint8Array))
                o + e.length > n.length
                  ? (a.isBuffer(e) || (e = a.from(e)), e.copy(n, o))
                  : Uint8Array.prototype.set.call(n, e, o);
              else {
                if (!a.isBuffer(e)) throw new TypeError('"list" argument must be an Array of Buffers');
                e.copy(n, o);
              }
              o += e.length;
            }
            return n;
          }),
          (a.byteLength = d),
          (a.prototype._isBuffer = !0),
          (a.prototype.swap16 = function () {
            const t = this.length;
            if (t % 2 != 0) throw new RangeError('Buffer size must be a multiple of 16-bits');
            for (let e = 0; e < t; e += 2) w(this, e, e + 1);
            return this;
          }),
          (a.prototype.swap32 = function () {
            const t = this.length;
            if (t % 4 != 0) throw new RangeError('Buffer size must be a multiple of 32-bits');
            for (let e = 0; e < t; e += 4) w(this, e, e + 3), w(this, e + 1, e + 2);
            return this;
          }),
          (a.prototype.swap64 = function () {
            const t = this.length;
            if (t % 8 != 0) throw new RangeError('Buffer size must be a multiple of 64-bits');
            for (let e = 0; e < t; e += 8)
              w(this, e, e + 7), w(this, e + 1, e + 6), w(this, e + 2, e + 5), w(this, e + 3, e + 4);
            return this;
          }),
          (a.prototype.toString = function () {
            const t = this.length;
            return 0 === t ? '' : 0 === arguments.length ? O(this, 0, t) : g.apply(this, arguments);
          }),
          (a.prototype.toLocaleString = a.prototype.toString),
          (a.prototype.equals = function (t) {
            if (!a.isBuffer(t)) throw new TypeError('Argument must be a Buffer');
            return this === t || 0 === a.compare(this, t);
          }),
          (a.prototype.inspect = function () {
            let t = '';
            const r = e.h2;
            return (
              (t = this.toString('hex', 0, r)
                .replace(/(.{2})/g, '$1 ')
                .trim()),
              this.length > r && (t += ' ... '),
              '<Buffer ' + t + '>'
            );
          }),
          i && (a.prototype[i] = a.prototype.inspect),
          (a.prototype.compare = function (t, e, r, n, o) {
            if ((J(t, Uint8Array) && (t = a.from(t, t.offset, t.byteLength)), !a.isBuffer(t)))
              throw new TypeError(
                'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof t
              );
            if (
              (void 0 === e && (e = 0),
              void 0 === r && (r = t ? t.length : 0),
              void 0 === n && (n = 0),
              void 0 === o && (o = this.length),
              e < 0 || r > t.length || n < 0 || o > this.length)
            )
              throw new RangeError('out of range index');
            if (n >= o && e >= r) return 0;
            if (n >= o) return -1;
            if (e >= r) return 1;
            if (this === t) return 0;
            let i = (o >>>= 0) - (n >>>= 0),
              s = (r >>>= 0) - (e >>>= 0);
            const f = Math.min(i, s),
              u = this.slice(n, o),
              c = t.slice(e, r);
            for (let t = 0; t < f; ++t)
              if (u[t] !== c[t]) {
                (i = u[t]), (s = c[t]);
                break;
              }
            return i < s ? -1 : s < i ? 1 : 0;
          }),
          (a.prototype.includes = function (t, e, r) {
            return -1 !== this.indexOf(t, e, r);
          }),
          (a.prototype.indexOf = function (t, e, r) {
            return b(this, t, e, r, !0);
          }),
          (a.prototype.lastIndexOf = function (t, e, r) {
            return b(this, t, e, r, !1);
          }),
          (a.prototype.write = function (t, e, r, n) {
            if (void 0 === e) (n = 'utf8'), (r = this.length), (e = 0);
            else if (void 0 === r && 'string' == typeof e) (n = e), (r = this.length), (e = 0);
            else {
              if (!isFinite(e))
                throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported');
              (e >>>= 0), isFinite(r) ? ((r >>>= 0), void 0 === n && (n = 'utf8')) : ((n = r), (r = void 0));
            }
            const o = this.length - e;
            if (((void 0 === r || r > o) && (r = o), (t.length > 0 && (r < 0 || e < 0)) || e > this.length))
              throw new RangeError('Attempt to write outside buffer bounds');
            n || (n = 'utf8');
            let i = !1;
            for (;;)
              switch (n) {
                case 'hex':
                  return _(this, t, e, r);
                case 'utf8':
                case 'utf-8':
                  return v(this, t, e, r);
                case 'ascii':
                case 'latin1':
                case 'binary':
                  return E(this, t, e, r);
                case 'base64':
                  return B(this, t, e, r);
                case 'ucs2':
                case 'ucs-2':
                case 'utf16le':
                case 'utf-16le':
                  return A(this, t, e, r);
                default:
                  if (i) throw new TypeError('Unknown encoding: ' + n);
                  (n = ('' + n).toLowerCase()), (i = !0);
              }
          }),
          (a.prototype.toJSON = function () {
            return {
              type: 'Buffer',
              data: Array.prototype.slice.call(this._arr || this, 0),
            };
          });
        const S = 4096;
        function P(t, e, r) {
          let n = '';
          r = Math.min(t.length, r);
          for (let o = e; o < r; ++o) n += String.fromCharCode(127 & t[o]);
          return n;
        }
        function U(t, e, r) {
          let n = '';
          r = Math.min(t.length, r);
          for (let o = e; o < r; ++o) n += String.fromCharCode(t[o]);
          return n;
        }
        function T(t, e, r) {
          const n = t.length;
          (!e || e < 0) && (e = 0), (!r || r < 0 || r > n) && (r = n);
          let o = '';
          for (let n = e; n < r; ++n) o += Z[t[n]];
          return o;
        }
        function R(t, e, r) {
          const n = t.slice(e, r);
          let o = '';
          for (let t = 0; t < n.length - 1; t += 2) o += String.fromCharCode(n[t] + 256 * n[t + 1]);
          return o;
        }
        function j(t, e, r) {
          if (t % 1 != 0 || t < 0) throw new RangeError('offset is not uint');
          if (t + e > r) throw new RangeError('Trying to access beyond buffer length');
        }
        function x(t, e, r, n, o, i) {
          if (!a.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance');
          if (e > o || e < i) throw new RangeError('"value" argument is out of bounds');
          if (r + n > t.length) throw new RangeError('Index out of range');
        }
        function L(t, e, r, n, o) {
          D(e, n, o, t, r, 7);
          let i = Number(e & BigInt(4294967295));
          (t[r++] = i), (i >>= 8), (t[r++] = i), (i >>= 8), (t[r++] = i), (i >>= 8), (t[r++] = i);
          let s = Number((e >> BigInt(32)) & BigInt(4294967295));
          return (t[r++] = s), (s >>= 8), (t[r++] = s), (s >>= 8), (t[r++] = s), (s >>= 8), (t[r++] = s), r;
        }
        function C(t, e, r, n, o) {
          D(e, n, o, t, r, 7);
          let i = Number(e & BigInt(4294967295));
          (t[r + 7] = i), (i >>= 8), (t[r + 6] = i), (i >>= 8), (t[r + 5] = i), (i >>= 8), (t[r + 4] = i);
          let s = Number((e >> BigInt(32)) & BigInt(4294967295));
          return (t[r + 3] = s), (s >>= 8), (t[r + 2] = s), (s >>= 8), (t[r + 1] = s), (s >>= 8), (t[r] = s), r + 8;
        }
        function M(t, e, r, n, o, i) {
          if (r + n > t.length) throw new RangeError('Index out of range');
          if (r < 0) throw new RangeError('Index out of range');
        }
        function F(t, e, r, n, i) {
          return (e = +e), (r >>>= 0), i || M(t, 0, r, 4), o.write(t, e, r, n, 23, 4), r + 4;
        }
        function N(t, e, r, n, i) {
          return (e = +e), (r >>>= 0), i || M(t, 0, r, 8), o.write(t, e, r, n, 52, 8), r + 8;
        }
        (a.prototype.slice = function (t, e) {
          const r = this.length;
          (t = ~~t) < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r),
            (e = void 0 === e ? r : ~~e) < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r),
            e < t && (e = t);
          const n = this.subarray(t, e);
          return Object.setPrototypeOf(n, a.prototype), n;
        }),
          (a.prototype.readUintLE = a.prototype.readUIntLE =
            function (t, e, r) {
              (t >>>= 0), (e >>>= 0), r || j(t, e, this.length);
              let n = this[t],
                o = 1,
                i = 0;
              for (; ++i < e && (o *= 256); ) n += this[t + i] * o;
              return n;
            }),
          (a.prototype.readUintBE = a.prototype.readUIntBE =
            function (t, e, r) {
              (t >>>= 0), (e >>>= 0), r || j(t, e, this.length);
              let n = this[t + --e],
                o = 1;
              for (; e > 0 && (o *= 256); ) n += this[t + --e] * o;
              return n;
            }),
          (a.prototype.readUint8 = a.prototype.readUInt8 =
            function (t, e) {
              return (t >>>= 0), e || j(t, 1, this.length), this[t];
            }),
          (a.prototype.readUint16LE = a.prototype.readUInt16LE =
            function (t, e) {
              return (t >>>= 0), e || j(t, 2, this.length), this[t] | (this[t + 1] << 8);
            }),
          (a.prototype.readUint16BE = a.prototype.readUInt16BE =
            function (t, e) {
              return (t >>>= 0), e || j(t, 2, this.length), (this[t] << 8) | this[t + 1];
            }),
          (a.prototype.readUint32LE = a.prototype.readUInt32LE =
            function (t, e) {
              return (
                (t >>>= 0),
                e || j(t, 4, this.length),
                (this[t] | (this[t + 1] << 8) | (this[t + 2] << 16)) + 16777216 * this[t + 3]
              );
            }),
          (a.prototype.readUint32BE = a.prototype.readUInt32BE =
            function (t, e) {
              return (
                (t >>>= 0),
                e || j(t, 4, this.length),
                16777216 * this[t] + ((this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3])
              );
            }),
          (a.prototype.readBigUInt64LE = Q(function (t) {
            K((t >>>= 0), 'offset');
            const e = this[t],
              r = this[t + 7];
            (void 0 !== e && void 0 !== r) || z(t, this.length - 8);
            const n = e + 256 * this[++t] + 65536 * this[++t] + this[++t] * 2 ** 24,
              o = this[++t] + 256 * this[++t] + 65536 * this[++t] + r * 2 ** 24;
            return BigInt(n) + (BigInt(o) << BigInt(32));
          })),
          (a.prototype.readBigUInt64BE = Q(function (t) {
            K((t >>>= 0), 'offset');
            const e = this[t],
              r = this[t + 7];
            (void 0 !== e && void 0 !== r) || z(t, this.length - 8);
            const n = e * 2 ** 24 + 65536 * this[++t] + 256 * this[++t] + this[++t],
              o = this[++t] * 2 ** 24 + 65536 * this[++t] + 256 * this[++t] + r;
            return (BigInt(n) << BigInt(32)) + BigInt(o);
          })),
          (a.prototype.readIntLE = function (t, e, r) {
            (t >>>= 0), (e >>>= 0), r || j(t, e, this.length);
            let n = this[t],
              o = 1,
              i = 0;
            for (; ++i < e && (o *= 256); ) n += this[t + i] * o;
            return (o *= 128), n >= o && (n -= Math.pow(2, 8 * e)), n;
          }),
          (a.prototype.readIntBE = function (t, e, r) {
            (t >>>= 0), (e >>>= 0), r || j(t, e, this.length);
            let n = e,
              o = 1,
              i = this[t + --n];
            for (; n > 0 && (o *= 256); ) i += this[t + --n] * o;
            return (o *= 128), i >= o && (i -= Math.pow(2, 8 * e)), i;
          }),
          (a.prototype.readInt8 = function (t, e) {
            return (t >>>= 0), e || j(t, 1, this.length), 128 & this[t] ? -1 * (255 - this[t] + 1) : this[t];
          }),
          (a.prototype.readInt16LE = function (t, e) {
            (t >>>= 0), e || j(t, 2, this.length);
            const r = this[t] | (this[t + 1] << 8);
            return 32768 & r ? 4294901760 | r : r;
          }),
          (a.prototype.readInt16BE = function (t, e) {
            (t >>>= 0), e || j(t, 2, this.length);
            const r = this[t + 1] | (this[t] << 8);
            return 32768 & r ? 4294901760 | r : r;
          }),
          (a.prototype.readInt32LE = function (t, e) {
            return (
              (t >>>= 0),
              e || j(t, 4, this.length),
              this[t] | (this[t + 1] << 8) | (this[t + 2] << 16) | (this[t + 3] << 24)
            );
          }),
          (a.prototype.readInt32BE = function (t, e) {
            return (
              (t >>>= 0),
              e || j(t, 4, this.length),
              (this[t] << 24) | (this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3]
            );
          }),
          (a.prototype.readBigInt64LE = Q(function (t) {
            K((t >>>= 0), 'offset');
            const e = this[t],
              r = this[t + 7];
            (void 0 !== e && void 0 !== r) || z(t, this.length - 8);
            const n = this[t + 4] + 256 * this[t + 5] + 65536 * this[t + 6] + (r << 24);
            return (BigInt(n) << BigInt(32)) + BigInt(e + 256 * this[++t] + 65536 * this[++t] + this[++t] * 2 ** 24);
          })),
          (a.prototype.readBigInt64BE = Q(function (t) {
            K((t >>>= 0), 'offset');
            const e = this[t],
              r = this[t + 7];
            (void 0 !== e && void 0 !== r) || z(t, this.length - 8);
            const n = (e << 24) + 65536 * this[++t] + 256 * this[++t] + this[++t];
            return (BigInt(n) << BigInt(32)) + BigInt(this[++t] * 2 ** 24 + 65536 * this[++t] + 256 * this[++t] + r);
          })),
          (a.prototype.readFloatLE = function (t, e) {
            return (t >>>= 0), e || j(t, 4, this.length), o.read(this, t, !0, 23, 4);
          }),
          (a.prototype.readFloatBE = function (t, e) {
            return (t >>>= 0), e || j(t, 4, this.length), o.read(this, t, !1, 23, 4);
          }),
          (a.prototype.readDoubleLE = function (t, e) {
            return (t >>>= 0), e || j(t, 8, this.length), o.read(this, t, !0, 52, 8);
          }),
          (a.prototype.readDoubleBE = function (t, e) {
            return (t >>>= 0), e || j(t, 8, this.length), o.read(this, t, !1, 52, 8);
          }),
          (a.prototype.writeUintLE = a.prototype.writeUIntLE =
            function (t, e, r, n) {
              (t = +t), (e >>>= 0), (r >>>= 0), n || x(this, t, e, r, Math.pow(2, 8 * r) - 1, 0);
              let o = 1,
                i = 0;
              for (this[e] = 255 & t; ++i < r && (o *= 256); ) this[e + i] = (t / o) & 255;
              return e + r;
            }),
          (a.prototype.writeUintBE = a.prototype.writeUIntBE =
            function (t, e, r, n) {
              (t = +t), (e >>>= 0), (r >>>= 0), n || x(this, t, e, r, Math.pow(2, 8 * r) - 1, 0);
              let o = r - 1,
                i = 1;
              for (this[e + o] = 255 & t; --o >= 0 && (i *= 256); ) this[e + o] = (t / i) & 255;
              return e + r;
            }),
          (a.prototype.writeUint8 = a.prototype.writeUInt8 =
            function (t, e, r) {
              return (t = +t), (e >>>= 0), r || x(this, t, e, 1, 255, 0), (this[e] = 255 & t), e + 1;
            }),
          (a.prototype.writeUint16LE = a.prototype.writeUInt16LE =
            function (t, e, r) {
              return (
                (t = +t),
                (e >>>= 0),
                r || x(this, t, e, 2, 65535, 0),
                (this[e] = 255 & t),
                (this[e + 1] = t >>> 8),
                e + 2
              );
            }),
          (a.prototype.writeUint16BE = a.prototype.writeUInt16BE =
            function (t, e, r) {
              return (
                (t = +t),
                (e >>>= 0),
                r || x(this, t, e, 2, 65535, 0),
                (this[e] = t >>> 8),
                (this[e + 1] = 255 & t),
                e + 2
              );
            }),
          (a.prototype.writeUint32LE = a.prototype.writeUInt32LE =
            function (t, e, r) {
              return (
                (t = +t),
                (e >>>= 0),
                r || x(this, t, e, 4, 4294967295, 0),
                (this[e + 3] = t >>> 24),
                (this[e + 2] = t >>> 16),
                (this[e + 1] = t >>> 8),
                (this[e] = 255 & t),
                e + 4
              );
            }),
          (a.prototype.writeUint32BE = a.prototype.writeUInt32BE =
            function (t, e, r) {
              return (
                (t = +t),
                (e >>>= 0),
                r || x(this, t, e, 4, 4294967295, 0),
                (this[e] = t >>> 24),
                (this[e + 1] = t >>> 16),
                (this[e + 2] = t >>> 8),
                (this[e + 3] = 255 & t),
                e + 4
              );
            }),
          (a.prototype.writeBigUInt64LE = Q(function (t, e = 0) {
            return L(this, t, e, BigInt(0), BigInt('0xffffffffffffffff'));
          })),
          (a.prototype.writeBigUInt64BE = Q(function (t, e = 0) {
            return C(this, t, e, BigInt(0), BigInt('0xffffffffffffffff'));
          })),
          (a.prototype.writeIntLE = function (t, e, r, n) {
            if (((t = +t), (e >>>= 0), !n)) {
              const n = Math.pow(2, 8 * r - 1);
              x(this, t, e, r, n - 1, -n);
            }
            let o = 0,
              i = 1,
              s = 0;
            for (this[e] = 255 & t; ++o < r && (i *= 256); )
              t < 0 && 0 === s && 0 !== this[e + o - 1] && (s = 1), (this[e + o] = (((t / i) >> 0) - s) & 255);
            return e + r;
          }),
          (a.prototype.writeIntBE = function (t, e, r, n) {
            if (((t = +t), (e >>>= 0), !n)) {
              const n = Math.pow(2, 8 * r - 1);
              x(this, t, e, r, n - 1, -n);
            }
            let o = r - 1,
              i = 1,
              s = 0;
            for (this[e + o] = 255 & t; --o >= 0 && (i *= 256); )
              t < 0 && 0 === s && 0 !== this[e + o + 1] && (s = 1), (this[e + o] = (((t / i) >> 0) - s) & 255);
            return e + r;
          }),
          (a.prototype.writeInt8 = function (t, e, r) {
            return (
              (t = +t),
              (e >>>= 0),
              r || x(this, t, e, 1, 127, -128),
              t < 0 && (t = 255 + t + 1),
              (this[e] = 255 & t),
              e + 1
            );
          }),
          (a.prototype.writeInt16LE = function (t, e, r) {
            return (
              (t = +t),
              (e >>>= 0),
              r || x(this, t, e, 2, 32767, -32768),
              (this[e] = 255 & t),
              (this[e + 1] = t >>> 8),
              e + 2
            );
          }),
          (a.prototype.writeInt16BE = function (t, e, r) {
            return (
              (t = +t),
              (e >>>= 0),
              r || x(this, t, e, 2, 32767, -32768),
              (this[e] = t >>> 8),
              (this[e + 1] = 255 & t),
              e + 2
            );
          }),
          (a.prototype.writeInt32LE = function (t, e, r) {
            return (
              (t = +t),
              (e >>>= 0),
              r || x(this, t, e, 4, 2147483647, -2147483648),
              (this[e] = 255 & t),
              (this[e + 1] = t >>> 8),
              (this[e + 2] = t >>> 16),
              (this[e + 3] = t >>> 24),
              e + 4
            );
          }),
          (a.prototype.writeInt32BE = function (t, e, r) {
            return (
              (t = +t),
              (e >>>= 0),
              r || x(this, t, e, 4, 2147483647, -2147483648),
              t < 0 && (t = 4294967295 + t + 1),
              (this[e] = t >>> 24),
              (this[e + 1] = t >>> 16),
              (this[e + 2] = t >>> 8),
              (this[e + 3] = 255 & t),
              e + 4
            );
          }),
          (a.prototype.writeBigInt64LE = Q(function (t, e = 0) {
            return L(this, t, e, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'));
          })),
          (a.prototype.writeBigInt64BE = Q(function (t, e = 0) {
            return C(this, t, e, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'));
          })),
          (a.prototype.writeFloatLE = function (t, e, r) {
            return F(this, t, e, !0, r);
          }),
          (a.prototype.writeFloatBE = function (t, e, r) {
            return F(this, t, e, !1, r);
          }),
          (a.prototype.writeDoubleLE = function (t, e, r) {
            return N(this, t, e, !0, r);
          }),
          (a.prototype.writeDoubleBE = function (t, e, r) {
            return N(this, t, e, !1, r);
          }),
          (a.prototype.copy = function (t, e, r, n) {
            if (!a.isBuffer(t)) throw new TypeError('argument should be a Buffer');
            if (
              (r || (r = 0),
              n || 0 === n || (n = this.length),
              e >= t.length && (e = t.length),
              e || (e = 0),
              n > 0 && n < r && (n = r),
              n === r)
            )
              return 0;
            if (0 === t.length || 0 === this.length) return 0;
            if (e < 0) throw new RangeError('targetStart out of bounds');
            if (r < 0 || r >= this.length) throw new RangeError('Index out of range');
            if (n < 0) throw new RangeError('sourceEnd out of bounds');
            n > this.length && (n = this.length), t.length - e < n - r && (n = t.length - e + r);
            const o = n - r;
            return (
              this === t && 'function' == typeof Uint8Array.prototype.copyWithin
                ? this.copyWithin(e, r, n)
                : Uint8Array.prototype.set.call(t, this.subarray(r, n), e),
              o
            );
          }),
          (a.prototype.fill = function (t, e, r, n) {
            if ('string' == typeof t) {
              if (
                ('string' == typeof e
                  ? ((n = e), (e = 0), (r = this.length))
                  : 'string' == typeof r && ((n = r), (r = this.length)),
                void 0 !== n && 'string' != typeof n)
              )
                throw new TypeError('encoding must be a string');
              if ('string' == typeof n && !a.isEncoding(n)) throw new TypeError('Unknown encoding: ' + n);
              if (1 === t.length) {
                const e = t.charCodeAt(0);
                (('utf8' === n && e < 128) || 'latin1' === n) && (t = e);
              }
            } else 'number' == typeof t ? (t &= 255) : 'boolean' == typeof t && (t = Number(t));
            if (e < 0 || this.length < e || this.length < r) throw new RangeError('Out of range index');
            if (r <= e) return this;
            let o;
            if (((e >>>= 0), (r = void 0 === r ? this.length : r >>> 0), t || (t = 0), 'number' == typeof t))
              for (o = e; o < r; ++o) this[o] = t;
            else {
              const i = a.isBuffer(t) ? t : a.from(t, n),
                s = i.length;
              if (0 === s) throw new TypeError('The value "' + t + '" is invalid for argument "value"');
              for (o = 0; o < r - e; ++o) this[o + e] = i[o % s];
            }
            return this;
          });
        const $ = {};
        function k(t, e, r) {
          $[t] = class extends r {
            constructor() {
              super(),
                Object.defineProperty(this, 'message', {
                  value: e.apply(this, arguments),
                  writable: !0,
                  configurable: !0,
                }),
                (this.name = `${this.name} [${t}]`),
                this.stack,
                delete this.name;
            }
            get code() {
              return t;
            }
            set code(t) {
              Object.defineProperty(this, 'code', {
                configurable: !0,
                enumerable: !0,
                value: t,
                writable: !0,
              });
            }
            toString() {
              return `${this.name} [${t}]: ${this.message}`;
            }
          };
        }
        function G(t) {
          let e = '',
            r = t.length;
          const n = '-' === t[0] ? 1 : 0;
          for (; r >= n + 4; r -= 3) e = `_${t.slice(r - 3, r)}${e}`;
          return `${t.slice(0, r)}${e}`;
        }
        function D(t, e, r, n, o, i) {
          if (t > r || t < e) {
            const n = 'bigint' == typeof e ? 'n' : '';
            let o;
            throw (
              ((o =
                i > 3
                  ? 0 === e || e === BigInt(0)
                    ? `>= 0${n} and < 2${n} ** ${8 * (i + 1)}${n}`
                    : `>= -(2${n} ** ${8 * (i + 1) - 1}${n}) and < 2 ** ${8 * (i + 1) - 1}${n}`
                  : `>= ${e}${n} and <= ${r}${n}`),
              new $.ERR_OUT_OF_RANGE('value', o, t))
            );
          }
          !(function (t, e, r) {
            K(e, 'offset'), (void 0 !== t[e] && void 0 !== t[e + r]) || z(e, t.length - (r + 1));
          })(n, o, i);
        }
        function K(t, e) {
          if ('number' != typeof t) throw new $.ERR_INVALID_ARG_TYPE(e, 'number', t);
        }
        function z(t, e, r) {
          if (Math.floor(t) !== t) throw (K(t, r), new $.ERR_OUT_OF_RANGE(r || 'offset', 'an integer', t));
          if (e < 0) throw new $.ERR_BUFFER_OUT_OF_BOUNDS();
          throw new $.ERR_OUT_OF_RANGE(r || 'offset', `>= ${r ? 1 : 0} and <= ${e}`, t);
        }
        k(
          'ERR_BUFFER_OUT_OF_BOUNDS',
          function (t) {
            return t ? `${t} is outside of buffer bounds` : 'Attempt to access memory outside buffer bounds';
          },
          RangeError
        ),
          k(
            'ERR_INVALID_ARG_TYPE',
            function (t, e) {
              return `The "${t}" argument must be of type number. Received type ${typeof e}`;
            },
            TypeError
          ),
          k(
            'ERR_OUT_OF_RANGE',
            function (t, e, r) {
              let n = `The value of "${t}" is out of range.`,
                o = r;
              return (
                Number.isInteger(r) && Math.abs(r) > 2 ** 32
                  ? (o = G(String(r)))
                  : 'bigint' == typeof r &&
                    ((o = String(r)),
                    (r > BigInt(2) ** BigInt(32) || r < -(BigInt(2) ** BigInt(32))) && (o = G(o)),
                    (o += 'n')),
                (n += ` It must be ${e}. Received ${o}`),
                n
              );
            },
            RangeError
          );
        const W = /[^+/0-9A-Za-z-_]/g;
        function q(t, e) {
          let r;
          e = e || 1 / 0;
          const n = t.length;
          let o = null;
          const i = [];
          for (let s = 0; s < n; ++s) {
            if (((r = t.charCodeAt(s)), r > 55295 && r < 57344)) {
              if (!o) {
                if (r > 56319) {
                  (e -= 3) > -1 && i.push(239, 191, 189);
                  continue;
                }
                if (s + 1 === n) {
                  (e -= 3) > -1 && i.push(239, 191, 189);
                  continue;
                }
                o = r;
                continue;
              }
              if (r < 56320) {
                (e -= 3) > -1 && i.push(239, 191, 189), (o = r);
                continue;
              }
              r = 65536 + (((o - 55296) << 10) | (r - 56320));
            } else o && (e -= 3) > -1 && i.push(239, 191, 189);
            if (((o = null), r < 128)) {
              if ((e -= 1) < 0) break;
              i.push(r);
            } else if (r < 2048) {
              if ((e -= 2) < 0) break;
              i.push((r >> 6) | 192, (63 & r) | 128);
            } else if (r < 65536) {
              if ((e -= 3) < 0) break;
              i.push((r >> 12) | 224, ((r >> 6) & 63) | 128, (63 & r) | 128);
            } else {
              if (!(r < 1114112)) throw new Error('Invalid code point');
              if ((e -= 4) < 0) break;
              i.push((r >> 18) | 240, ((r >> 12) & 63) | 128, ((r >> 6) & 63) | 128, (63 & r) | 128);
            }
          }
          return i;
        }
        function V(t) {
          return n.toByteArray(
            (function (t) {
              if ((t = (t = t.split('=')[0]).trim().replace(W, '')).length < 2) return '';
              for (; t.length % 4 != 0; ) t += '=';
              return t;
            })(t)
          );
        }
        function Y(t, e, r, n) {
          let o;
          for (o = 0; o < n && !(o + r >= e.length || o >= t.length); ++o) e[o + r] = t[o];
          return o;
        }
        function J(t, e) {
          return (
            t instanceof e ||
            (null != t && null != t.constructor && null != t.constructor.name && t.constructor.name === e.name)
          );
        }
        function H(t) {
          return t != t;
        }
        const Z = (function () {
          const t = '0123456789abcdef',
            e = new Array(256);
          for (let r = 0; r < 16; ++r) {
            const n = 16 * r;
            for (let o = 0; o < 16; ++o) e[n + o] = t[r] + t[o];
          }
          return e;
        })();
        function Q(t) {
          return 'undefined' == typeof BigInt ? X : t;
        }
        function X() {
          throw new Error('BigInt not supported');
        }
      },
      645: (t, e) => {
        (e.read = function (t, e, r, n, o) {
          var i,
            s,
            f = 8 * o - n - 1,
            a = (1 << f) - 1,
            u = a >> 1,
            c = -7,
            l = r ? o - 1 : 0,
            h = r ? -1 : 1,
            p = t[e + l];
          for (l += h, i = p & ((1 << -c) - 1), p >>= -c, c += f; c > 0; i = 256 * i + t[e + l], l += h, c -= 8);
          for (s = i & ((1 << -c) - 1), i >>= -c, c += n; c > 0; s = 256 * s + t[e + l], l += h, c -= 8);
          if (0 === i) i = 1 - u;
          else {
            if (i === a) return s ? NaN : (1 / 0) * (p ? -1 : 1);
            (s += Math.pow(2, n)), (i -= u);
          }
          return (p ? -1 : 1) * s * Math.pow(2, i - n);
        }),
          (e.write = function (t, e, r, n, o, i) {
            var s,
              f,
              a,
              u = 8 * i - o - 1,
              c = (1 << u) - 1,
              l = c >> 1,
              h = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
              p = n ? 0 : i - 1,
              y = n ? 1 : -1,
              d = e < 0 || (0 === e && 1 / e < 0) ? 1 : 0;
            for (
              e = Math.abs(e),
                isNaN(e) || e === 1 / 0
                  ? ((f = isNaN(e) ? 1 : 0), (s = c))
                  : ((s = Math.floor(Math.log(e) / Math.LN2)),
                    e * (a = Math.pow(2, -s)) < 1 && (s--, (a *= 2)),
                    (e += s + l >= 1 ? h / a : h * Math.pow(2, 1 - l)) * a >= 2 && (s++, (a /= 2)),
                    s + l >= c
                      ? ((f = 0), (s = c))
                      : s + l >= 1
                      ? ((f = (e * a - 1) * Math.pow(2, o)), (s += l))
                      : ((f = e * Math.pow(2, l - 1) * Math.pow(2, o)), (s = 0)));
              o >= 8;
              t[r + p] = 255 & f, p += y, f /= 256, o -= 8
            );
            for (s = (s << o) | f, u += o; u > 0; t[r + p] = 255 & s, p += y, s /= 256, u -= 8);
            t[r + p - y] |= 128 * d;
          });
      },
      217: (t, e, r) => {
        'use strict';
        var n = r(764).lW;
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.default = class {
            constructor(t, e) {
              (this.publicKeyString = t), (this.publicKeyArray = e);
            }
            toBase58() {
              return this.publicKeyString;
            }
            toBuffer() {
              return n.from(this.publicKeyArray);
            }
            toBytes() {
              return Uint8Array.from(this.publicKeyArray);
            }
            toJSON() {
              return this.publicKeyString;
            }
            toString() {
              return this.publicKeyString;
            }
            equals(t) {
              return t.publicKeyString === this.publicKeyString;
            }
          });
      },
      136: (t, e, r) => {
        'use strict';
        Object.defineProperty(e, '__esModule', { value: !0 });
        const n = r(593);
        e.default = class {
          constructor(t) {
            (this.resolves = {}), (this.handlerName = t);
          }
          send(t, e) {
            return new Promise((r, o) => {
              const i = (0, n.genId)();
              (this.resolves[i] = { resolve: r, reject: o }), this.postMessage({ type: t, id: i, payload: e });
            });
          }
          async postMessage(t) {
            const e = await window.flutter_inappwebview.callHandler(this.handlerName, t);
            this.sendResponse(e);
          }
          sendResponse(t) {
            const e = this.resolves[t.id];
            e && ('error' === t.type ? e.reject(t.payload) : e.resolve(t.payload));
          }
        };
      },
      593: (t, e) => {
        'use strict';
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.getSignTransactionParams = e.genId = void 0),
          (e.genId = function () {
            return (100 * Date.now() + Math.floor(100 * Math.random())).toString(32);
          }),
          (e.getSignTransactionParams = function (t) {
            return {
              transaction: Array.from(t.serialize({ verifySignatures: !1 })),
            };
          });
      },
      655: (t, e, r) => {
        'use strict';
        r.r(e),
          r.d(e, {
            __assign: () => i,
            __asyncDelegator: () => I,
            __asyncGenerator: () => A,
            __asyncValues: () => O,
            __await: () => B,
            __awaiter: () => y,
            __classPrivateFieldGet: () => R,
            __classPrivateFieldIn: () => x,
            __classPrivateFieldSet: () => j,
            __createBinding: () => g,
            __decorate: () => f,
            __esDecorate: () => u,
            __exportStar: () => w,
            __extends: () => o,
            __generator: () => d,
            __importDefault: () => T,
            __importStar: () => U,
            __makeTemplateObject: () => S,
            __metadata: () => p,
            __param: () => a,
            __propKey: () => l,
            __read: () => m,
            __rest: () => s,
            __runInitializers: () => c,
            __setFunctionName: () => h,
            __spread: () => _,
            __spreadArray: () => E,
            __spreadArrays: () => v,
            __values: () => b,
            default: () => L,
          });
        var n = function (t, e) {
          return (
            (n =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (t, e) {
                  t.__proto__ = e;
                }) ||
              function (t, e) {
                for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
              }),
            n(t, e)
          );
        };
        function o(t, e) {
          if ('function' != typeof e && null !== e)
            throw new TypeError('Class extends value ' + String(e) + ' is not a constructor or null');
          function r() {
            this.constructor = t;
          }
          n(t, e), (t.prototype = null === e ? Object.create(e) : ((r.prototype = e.prototype), new r()));
        }
        var i = function () {
          return (
            (i =
              Object.assign ||
              function (t) {
                for (var e, r = 1, n = arguments.length; r < n; r++)
                  for (var o in (e = arguments[r])) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
                return t;
              }),
            i.apply(this, arguments)
          );
        };
        function s(t, e) {
          var r = {};
          for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && e.indexOf(n) < 0 && (r[n] = t[n]);
          if (null != t && 'function' == typeof Object.getOwnPropertySymbols) {
            var o = 0;
            for (n = Object.getOwnPropertySymbols(t); o < n.length; o++)
              e.indexOf(n[o]) < 0 && Object.prototype.propertyIsEnumerable.call(t, n[o]) && (r[n[o]] = t[n[o]]);
          }
          return r;
        }
        function f(t, e, r, n) {
          var o,
            i = arguments.length,
            s = i < 3 ? e : null === n ? (n = Object.getOwnPropertyDescriptor(e, r)) : n;
          if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate) s = Reflect.decorate(t, e, r, n);
          else
            for (var f = t.length - 1; f >= 0; f--)
              (o = t[f]) && (s = (i < 3 ? o(s) : i > 3 ? o(e, r, s) : o(e, r)) || s);
          return i > 3 && s && Object.defineProperty(e, r, s), s;
        }
        function a(t, e) {
          return function (r, n) {
            e(r, n, t);
          };
        }
        function u(t, e, r, n, o, i) {
          function s(t) {
            if (void 0 !== t && 'function' != typeof t) throw new TypeError('Function expected');
            return t;
          }
          for (
            var f,
              a = n.kind,
              u = 'getter' === a ? 'get' : 'setter' === a ? 'set' : 'value',
              c = !e && t ? (n.static ? t : t.prototype) : null,
              l = e || (c ? Object.getOwnPropertyDescriptor(c, n.name) : {}),
              h = !1,
              p = r.length - 1;
            p >= 0;
            p--
          ) {
            var y = {};
            for (var d in n) y[d] = 'access' === d ? {} : n[d];
            for (var d in n.access) y.access[d] = n.access[d];
            y.addInitializer = function (t) {
              if (h) throw new TypeError('Cannot add initializers after decoration has completed');
              i.push(s(t || null));
            };
            var g = (0, r[p])('accessor' === a ? { get: l.get, set: l.set } : l[u], y);
            if ('accessor' === a) {
              if (void 0 === g) continue;
              if (null === g || 'object' != typeof g) throw new TypeError('Object expected');
              (f = s(g.get)) && (l.get = f), (f = s(g.set)) && (l.set = f), (f = s(g.init)) && o.unshift(f);
            } else (f = s(g)) && ('field' === a ? o.unshift(f) : (l[u] = f));
          }
          c && Object.defineProperty(c, n.name, l), (h = !0);
        }
        function c(t, e, r) {
          for (var n = arguments.length > 2, o = 0; o < e.length; o++) r = n ? e[o].call(t, r) : e[o].call(t);
          return n ? r : void 0;
        }
        function l(t) {
          return 'symbol' == typeof t ? t : ''.concat(t);
        }
        function h(t, e, r) {
          return (
            'symbol' == typeof e && (e = e.description ? '['.concat(e.description, ']') : ''),
            Object.defineProperty(t, 'name', {
              configurable: !0,
              value: r ? ''.concat(r, ' ', e) : e,
            })
          );
        }
        function p(t, e) {
          if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata) return Reflect.metadata(t, e);
        }
        function y(t, e, r, n) {
          return new (r || (r = Promise))(function (o, i) {
            function s(t) {
              try {
                a(n.next(t));
              } catch (t) {
                i(t);
              }
            }
            function f(t) {
              try {
                a(n.throw(t));
              } catch (t) {
                i(t);
              }
            }
            function a(t) {
              var e;
              t.done
                ? o(t.value)
                : ((e = t.value),
                  e instanceof r
                    ? e
                    : new r(function (t) {
                        t(e);
                      })).then(s, f);
            }
            a((n = n.apply(t, e || [])).next());
          });
        }
        function d(t, e) {
          var r,
            n,
            o,
            i,
            s = {
              label: 0,
              sent: function () {
                if (1 & o[0]) throw o[1];
                return o[1];
              },
              trys: [],
              ops: [],
            };
          return (
            (i = { next: f(0), throw: f(1), return: f(2) }),
            'function' == typeof Symbol &&
              (i[Symbol.iterator] = function () {
                return this;
              }),
            i
          );
          function f(f) {
            return function (a) {
              return (function (f) {
                if (r) throw new TypeError('Generator is already executing.');
                for (; i && ((i = 0), f[0] && (s = 0)), s; )
                  try {
                    if (
                      ((r = 1),
                      n &&
                        (o = 2 & f[0] ? n.return : f[0] ? n.throw || ((o = n.return) && o.call(n), 0) : n.next) &&
                        !(o = o.call(n, f[1])).done)
                    )
                      return o;
                    switch (((n = 0), o && (f = [2 & f[0], o.value]), f[0])) {
                      case 0:
                      case 1:
                        o = f;
                        break;
                      case 4:
                        return s.label++, { value: f[1], done: !1 };
                      case 5:
                        s.label++, (n = f[1]), (f = [0]);
                        continue;
                      case 7:
                        (f = s.ops.pop()), s.trys.pop();
                        continue;
                      default:
                        if (!((o = (o = s.trys).length > 0 && o[o.length - 1]) || (6 !== f[0] && 2 !== f[0]))) {
                          s = 0;
                          continue;
                        }
                        if (3 === f[0] && (!o || (f[1] > o[0] && f[1] < o[3]))) {
                          s.label = f[1];
                          break;
                        }
                        if (6 === f[0] && s.label < o[1]) {
                          (s.label = o[1]), (o = f);
                          break;
                        }
                        if (o && s.label < o[2]) {
                          (s.label = o[2]), s.ops.push(f);
                          break;
                        }
                        o[2] && s.ops.pop(), s.trys.pop();
                        continue;
                    }
                    f = e.call(t, s);
                  } catch (t) {
                    (f = [6, t]), (n = 0);
                  } finally {
                    r = o = 0;
                  }
                if (5 & f[0]) throw f[1];
                return { value: f[0] ? f[1] : void 0, done: !0 };
              })([f, a]);
            };
          }
        }
        var g = Object.create
          ? function (t, e, r, n) {
              void 0 === n && (n = r);
              var o = Object.getOwnPropertyDescriptor(e, r);
              (o && !('get' in o ? !e.__esModule : o.writable || o.configurable)) ||
                (o = {
                  enumerable: !0,
                  get: function () {
                    return e[r];
                  },
                }),
                Object.defineProperty(t, n, o);
            }
          : function (t, e, r, n) {
              void 0 === n && (n = r), (t[n] = e[r]);
            };
        function w(t, e) {
          for (var r in t) 'default' === r || Object.prototype.hasOwnProperty.call(e, r) || g(e, t, r);
        }
        function b(t) {
          var e = 'function' == typeof Symbol && Symbol.iterator,
            r = e && t[e],
            n = 0;
          if (r) return r.call(t);
          if (t && 'number' == typeof t.length)
            return {
              next: function () {
                return t && n >= t.length && (t = void 0), { value: t && t[n++], done: !t };
              },
            };
          throw new TypeError(e ? 'Object is not iterable.' : 'Symbol.iterator is not defined.');
        }
        function m(t, e) {
          var r = 'function' == typeof Symbol && t[Symbol.iterator];
          if (!r) return t;
          var n,
            o,
            i = r.call(t),
            s = [];
          try {
            for (; (void 0 === e || e-- > 0) && !(n = i.next()).done; ) s.push(n.value);
          } catch (t) {
            o = { error: t };
          } finally {
            try {
              n && !n.done && (r = i.return) && r.call(i);
            } finally {
              if (o) throw o.error;
            }
          }
          return s;
        }
        function _() {
          for (var t = [], e = 0; e < arguments.length; e++) t = t.concat(m(arguments[e]));
          return t;
        }
        function v() {
          for (var t = 0, e = 0, r = arguments.length; e < r; e++) t += arguments[e].length;
          var n = Array(t),
            o = 0;
          for (e = 0; e < r; e++) for (var i = arguments[e], s = 0, f = i.length; s < f; s++, o++) n[o] = i[s];
          return n;
        }
        function E(t, e, r) {
          if (r || 2 === arguments.length)
            for (var n, o = 0, i = e.length; o < i; o++)
              (!n && o in e) || (n || (n = Array.prototype.slice.call(e, 0, o)), (n[o] = e[o]));
          return t.concat(n || Array.prototype.slice.call(e));
        }
        function B(t) {
          return this instanceof B ? ((this.v = t), this) : new B(t);
        }
        function A(t, e, r) {
          if (!Symbol.asyncIterator) throw new TypeError('Symbol.asyncIterator is not defined.');
          var n,
            o = r.apply(t, e || []),
            i = [];
          return (
            (n = {}),
            s('next'),
            s('throw'),
            s('return'),
            (n[Symbol.asyncIterator] = function () {
              return this;
            }),
            n
          );
          function s(t) {
            o[t] &&
              (n[t] = function (e) {
                return new Promise(function (r, n) {
                  i.push([t, e, r, n]) > 1 || f(t, e);
                });
              });
          }
          function f(t, e) {
            try {
              (r = o[t](e)).value instanceof B ? Promise.resolve(r.value.v).then(a, u) : c(i[0][2], r);
            } catch (t) {
              c(i[0][3], t);
            }
            var r;
          }
          function a(t) {
            f('next', t);
          }
          function u(t) {
            f('throw', t);
          }
          function c(t, e) {
            t(e), i.shift(), i.length && f(i[0][0], i[0][1]);
          }
        }
        function I(t) {
          var e, r;
          return (
            (e = {}),
            n('next'),
            n('throw', function (t) {
              throw t;
            }),
            n('return'),
            (e[Symbol.iterator] = function () {
              return this;
            }),
            e
          );
          function n(n, o) {
            e[n] = t[n]
              ? function (e) {
                  return (r = !r) ? { value: B(t[n](e)), done: !1 } : o ? o(e) : e;
                }
              : o;
          }
        }
        function O(t) {
          if (!Symbol.asyncIterator) throw new TypeError('Symbol.asyncIterator is not defined.');
          var e,
            r = t[Symbol.asyncIterator];
          return r
            ? r.call(t)
            : ((t = b(t)),
              (e = {}),
              n('next'),
              n('throw'),
              n('return'),
              (e[Symbol.asyncIterator] = function () {
                return this;
              }),
              e);
          function n(r) {
            e[r] =
              t[r] &&
              function (e) {
                return new Promise(function (n, o) {
                  !(function (t, e, r, n) {
                    Promise.resolve(n).then(function (e) {
                      t({ value: e, done: r });
                    }, e);
                  })(n, o, (e = t[r](e)).done, e.value);
                });
              };
          }
        }
        function S(t, e) {
          return Object.defineProperty ? Object.defineProperty(t, 'raw', { value: e }) : (t.raw = e), t;
        }
        var P = Object.create
          ? function (t, e) {
              Object.defineProperty(t, 'default', { enumerable: !0, value: e });
            }
          : function (t, e) {
              t.default = e;
            };
        function U(t) {
          if (t && t.__esModule) return t;
          var e = {};
          if (null != t) for (var r in t) 'default' !== r && Object.prototype.hasOwnProperty.call(t, r) && g(e, t, r);
          return P(e, t), e;
        }
        function T(t) {
          return t && t.__esModule ? t : { default: t };
        }
        function R(t, e, r, n) {
          if ('a' === r && !n) throw new TypeError('Private accessor was defined without a getter');
          if ('function' == typeof e ? t !== e || !n : !e.has(t))
            throw new TypeError('Cannot read private member from an object whose class did not declare it');
          return 'm' === r ? n : 'a' === r ? n.call(t) : n ? n.value : e.get(t);
        }
        function j(t, e, r, n, o) {
          if ('m' === n) throw new TypeError('Private method is not writable');
          if ('a' === n && !o) throw new TypeError('Private accessor was defined without a setter');
          if ('function' == typeof e ? t !== e || !o : !e.has(t))
            throw new TypeError('Cannot write private member to an object whose class did not declare it');
          return 'a' === n ? o.call(t, r) : o ? (o.value = r) : e.set(t, r), r;
        }
        function x(t, e) {
          if (null === e || ('object' != typeof e && 'function' != typeof e))
            throw new TypeError("Cannot use 'in' operator on non-object");
          return 'function' == typeof t ? e === t : t.has(e);
        }
        const L = {
          __extends: o,
          __assign: i,
          __rest: s,
          __decorate: f,
          __param: a,
          __metadata: p,
          __awaiter: y,
          __generator: d,
          __createBinding: g,
          __exportStar: w,
          __values: b,
          __read: m,
          __spread: _,
          __spreadArrays: v,
          __spreadArray: E,
          __await: B,
          __asyncGenerator: A,
          __asyncDelegator: I,
          __asyncValues: O,
          __makeTemplateObject: S,
          __importStar: U,
          __importDefault: T,
          __classPrivateFieldGet: R,
          __classPrivateFieldSet: j,
          __classPrivateFieldIn: x,
        };
      },
    },
    e = {};
  function r(n) {
    var o = e[n];
    if (void 0 !== o) return o.exports;
    var i = (e[n] = { exports: {} });
    return t[n](i, i.exports, r), i.exports;
  }
  (r.d = (t, e) => {
    for (var n in e) r.o(e, n) && !r.o(t, n) && Object.defineProperty(t, n, { enumerable: !0, get: e[n] });
  }),
    (r.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e)),
    (r.r = (t) => {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(t, '__esModule', { value: !0 });
    }),
    (() => {
      'use strict';
      var t,
        e,
        n,
        o = r(764).lW;
      const i = r(655),
        s = i.__importDefault(r(136)),
        f = r(593),
        a = i.__importDefault(r(217));
      (e = new WeakMap()),
        (t = new WeakSet()),
        (n = function () {
          if (!this.isConnected) throw new Error('Wallet not connected!');
        }),
        setTimeout(() => {
          document.dispatchEvent(new CustomEvent('solanaLoaded')),
            window.dispatchEvent(new CustomEvent('solanaLoaded'));
        }, 1e3),
        (window.solanaBrige = new s.default('solana')),
        (window.isOpenWallet = true),
        (window.openwallet =
          window.openverse =
          window.solana =
            new (class {
              constructor() {
                t.add(this),
                  e.set(this, void 0),
                  (this.isConnected = !1),
                  (this.publicKey = null),
                  (this.isPhantom = !0),
                  (this.isTokenPocket = !0),
                  i.__classPrivateFieldSet(this, e, {}, 'f');
              }
              async connect() {
                if (this.isConnected) return;
                const { publicKeyString: t, publicKeyArray: e } = await window.solanaBrige.send('connect');
                return (this.publicKey = new a.default(t, e)), (this.isConnected = !0), this.isConnected;
              }
              async disconnect() {
                await window.solanaBrige.send('disconnect'),
                  (this.publicKey = null),
                  (this.isConnected = !1),
                  i.__classPrivateFieldGet(this, e, 'f').disconnect &&
                    i.__classPrivateFieldGet(this, e, 'f').disconnect();
              }
              on(t, r) {
                i.__classPrivateFieldGet(this, e, 'f')[t] = r;
              }
              off(t) {
                delete i.__classPrivateFieldGet(this, e, 'f')[t];
              }
              async signTransaction(e) {
                i.__classPrivateFieldGet(this, t, 'm', n).call(this);
                const r = await window.solanaBrige.send('signTransaction', (0, f.getSignTransactionParams)(e));
                return e.feePayer && e.addSignature(e.feePayer, o.from(r)), e;
              }
              async signAllTransactions(e) {
                i.__classPrivateFieldGet(this, t, 'm', n).call(this);
                const r = e.map(f.getSignTransactionParams),
                  s = await window.solanaBrige.send('signAllTransactions', r);
                if (this.publicKey)
                  for (let t = 0; t < e.length; t++) {
                    const r = e[t];
                    r.feePayer && r.addSignature(r.feePayer, o.from(s[t]));
                  }
                return e;
              }
              async signAndSendTransaction(e, r) {
                return (
                  i.__classPrivateFieldGet(this, t, 'm', n).call(this),
                  await window.solanaBrige.send('signAndSendTransaction', [e, r])
                );
              }
              async signAndSendAllTransactions(...e) {
                return (
                  i.__classPrivateFieldGet(this, t, 'm', n).call(this),
                  await window.solanaBrige.send('signAndSendAllTransactions', e)
                );
              }
              async signMessage(e) {
                i.__classPrivateFieldGet(this, t, 'm', n).call(this);
                const r = await window.solanaBrige.send('signMessage', e);
                return { signature: Uint8Array.from(r) };
              }
              async signIn(...e) {
                return i.__classPrivateFieldGet(this, t, 'm', n).call(this), await window.solanaBrige.send('signIn', e);
              }
              async handleNotification(...e) {
                return (
                  i.__classPrivateFieldGet(this, t, 'm', n).call(this),
                  await window.solanaBrige.send('handleNotification', e)
                );
              }
              async request(e) {
                return (
                  i.__classPrivateFieldGet(this, t, 'm', n).call(this), await window.solanaBrige.send('request', e)
                );
              }
            })()),
        (window.phantom = { solana: window.solana });
    })();
})();
