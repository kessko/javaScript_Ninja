/**
 * Created by Evgen on 19.11.2015.
 */


window.onload = function () {
    assert(true, 'Loaded');

    var ninja = {
        shout: function () {
            assert(true, 'Ninja');
        },
        chirp: function signal(n) {
            return n > 1 ? signal(n - 1) + '-chirp' : 'chirp';
        }

    };
    ninja.shout();

    setTimeout(function () {
        assert(false, 'We wait too long');
    }, 1000);


    var palindrome = 'adfrtwqwqwtrfda';

    function isPalindrome(text) {
        if (!text) return false;
        if (text.length <= 1) return true;
        if (text.charAt(0) === text.charAt(text.length - 1))
            return isPalindrome(text.substr(1, text.length - 2));
    }
    assert(isPalindrome(palindrome), palindrome + ' is palindrome');
    assert(isPalindrome(undefined), undefined + ' is palindrome');


    function chirp(n) {
        return n > 1 ? chirp(n - 1) + '-chirp' : 'chirp';
    }

    var samurai = {chirp: ninja.chirp};

    assert(chirp(3) === 'chirp-chirp-chirp', 'Ninja can chirp naturally');
    assert(ninja.chirp(3) === 'chirp-chirp-chirp', 'Ninja can chirp naturally from object');
    ninja = {};

    try {
        assert(samurai.chirp(3) === 'chirp-chirp-chirp', 'Samurai can chirp too');
    }
    catch (e) {
        assert(false, 'No! We lost ninja ability, and as a result samurai too');
    }

    var sayMyName = function innerFn() {
        assert(sayMyName == innerFn, 'the function are equals');
    };
    sayMyName();

    assert(typeof innerFn === undefined, 'we have no asses to this function outside of sayMyName fn');

    samurai = {
        chirpUseCalee: function (n) {
            return n > 1 ? arguments.callee(n - 1) + '-chirp' : 'chirp';
        }
    };
    assert(samurai.chirpUseCalee(3) === 'chirp-chirp-chirp', 'Samurai can chirp use callee :)');


};