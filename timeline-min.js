/*
 * Date Format 1.2.3
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 * MIT license
 *
 * Includes enhancements by Scott Trenda <scott.trenda.net>
 * and Kris Kowal <cixar.com/~kris.kowal/>
 *
 * Accepts a date, a mask, or a date and a mask.
 * Returns a formatted version of the given date.
 * The date defaults to the current date/time.
 * The mask defaults to dateFormat.masks.default.
 */
var $=jQuery.noConflict();
function trace(a) {
    window.console ? console.log(a) : typeof jsTrace != "undefined" && jsTrace.send(a)
}
function onAPIReadyPlayerAPIReady() {
    trace("GLOBAL YOUTUBE API CALLED");
    VMM.ExternalAPI.youtube.onAPIReady()
}
var dateFormat = function() {
    var a = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
    b = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
    c = /[^-+\dA-Z]/g,
    d = function(a, b) {
        a = String(a);
        b = b || 2;
        while (a.length < b) a = "0" + a;
        return a
    };
    return function(e, f, g) {
        var h = dateFormat;
        if (arguments.length == 1 && Object.prototype.toString.call(e) == "[object String]" && !/\d/.test(e)) {
            f = e;
            e = undefined
        }
        e = e ? new Date(e) : new Date;
        if (isNaN(e)) throw SyntaxError("invalid date");
        f = String(h.masks[f] || f || h.masks["default"]);
        if (f.slice(0, 4) == "UTC:") {
            f = f.slice(4);
            g = !0
        }
        var i = g ? "getUTC": "get",
        j = e[i + "Date"](),
        k = e[i + "Day"](),
        l = e[i + "Month"](),
        m = e[i + "FullYear"](),
        n = e[i + "Hours"](),
        o = e[i + "Minutes"](),
        p = e[i + "Seconds"](),
        q = e[i + "Milliseconds"](),
        r = g ? 0: e.getTimezoneOffset(),
        s = {
            d: j,
            dd: d(j),
            ddd: h.i18n.dayNames[k],
            dddd: h.i18n.dayNames[k + 7],
            m: l + 1,
            mm: d(l + 1),
            mmm: h.i18n.monthNames[l],
            mmmm: h.i18n.monthNames[l + 12],
            yy: String(m).slice(2),
            yyyy: m,
            h: n % 12 || 12,
            hh: d(n % 12 || 12),
            H: n,
            HH: d(n),
            M: o,
            MM: d(o),
            s: p,
            ss: d(p),
            l: d(q, 3),
            L: d(q > 99 ? Math.round(q / 10) : q),
            t: n < 12 ? "a": "p",
            tt: n < 12 ? "am": "pm",
            T: n < 12 ? "A": "P",
            TT: n < 12 ? "AM": "PM",
            Z: g ? "UTC": (String(e).match(b) || [""]).pop().replace(c, ""),
            o: (r > 0 ? "-": "+") + d(Math.floor(Math.abs(r) / 60) * 100 + Math.abs(r) % 60, 4),
            S: ["th", "st", "nd", "rd"][j % 10 > 3 ? 0: (j % 100 - j % 10 != 10) * j % 10]
        };
        return f.replace(a,
            function(a) {
                return a in s ? s[a] : a.slice(1, a.length - 1)
            })
    }
} ();
dateFormat.masks = {
    "default": "ddd mmm dd yyyy HH:MM:ss",
    shortDate: "m/d/yy",
    mediumDate: "mmm d, yyyy",
    longDate: "mmmm d, yyyy",
    fullDate: "dddd, mmmm d, yyyy",
    shortTime: "h:MM TT",
    mediumTime: "h:MM:ss TT",
    longTime: "h:MM:ss TT Z",
    isoDate: "yyyy-mm-dd",
    isoTime: "HH:MM:ss",
    isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
    isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};
dateFormat.i18n = {
    dayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
};
Date.prototype.format = function(a, b) {
    return dateFormat(this, a, b)
};
(function() {
    var a = !1,
    b = /xyz/.test(function() {
        xyz
    }) ? /\b_super\b/: /.*/;
    this.Class = function() {};
    Class.extend = function(c) {
        function g() {
            ! a && this.init && this.init.apply(this, arguments)
        }
        var d = this.prototype;
        a = !0;
        var e = new this;
        a = !1;
        for (var f in c) e[f] = typeof c[f] == "function" && typeof d[f] == "function" && b.test(c[f]) ?
            function(a, b) {
                return function() {
                    var c = this._super;
                    this._super = d[a];
                    var e = b.apply(this, arguments);
                    this._super = c;
                    return e
                }
            } (f, c[f]) : c[f];
        g.prototype = e;
        g.prototype.constructor = g;
        g.extend = arguments.callee;
        return g
    }
})();
var global = function() {
    return this || (1, eval)("this")
} ();
if (typeof VMM == "undefined") {
    var VMM = Class.extend({});
    VMM.master_config = {
        init: function() {
            return this
        },
        vp: "Pellentesque nibh felis, eleifend id, commodo in, interdum vitae, leo",
        keys: {
            flickr: "RAIvxHY4hE/Elm5cieh4X5ptMyDpj7MYIxziGxi0WGCcy1s+yr7rKQ==",
            google: "jwNGnYw4hE9lmAez4ll0QD+jo6SKBJFknkopLS4FrSAuGfIwyj57AusuR0s8dAo="
        },
        youtube: {
            active: !1,
            array: [],
            api_loaded: !1,
            que: []
        },
        i18n: {
            date: {
                month: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                month_abbr: ["Jan.", "Feb.", "March", "April", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."],
                day: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                day_abbr: ["Sun.", "Mon.", "Tues.", "Wed.", "Thurs.", "Fri.", "Sat."]
            },
            dateformats: {
                year: "yyyy",
                month_short: "mmm",
                month: "mmmm yyyy",
                full_short: "mmm d",
                full: "mmmm d',' yyyy",
                time_no_seconds_short: "hh:MM TT",
                time_no_seconds_small_date: "hh:MM TT'<br/><small>'mmmm d',' yyyy'</small>'",
                full_long: "dddd',' mmm d',' yyyy 'at' hh:MM TT",
                full_long_small_date: "hh:MM TT'<br/><small>'dddd',' mmm d',' yyyy'</small>'"
            },
            messages: {
                loading_timeline: "Loading Taimeline",
                return_to_title: "Return to Title",
                expand_timeline: "Expand Timeline",
                contract_timeline: "Contract Timeline"
            }
        },
        googlemaps: {
            active: !1,
            map_active: !1,
            places_active: !1,
            array: [],
            api_loaded: !1,
            que: []
        }
    }.init();
    VMM.createElement = function(a, b, c, d, e) {
        var f = "";
        if (a != null && a != "") {
            f += "<" + a;
            c != null && c != "" && (f += " class='" + c + "'");
            d != null && d != "" && (f += " " + d);
            e != null && e != "" && (f += " " + e);
            f += ">";
            b != null && b != "" && (f += b);
            f = f + "</" + a + ">"
        }
        return f
    };
    VMM.createMediaElement = function(a, b, c) {
        var d = "",
        e = !1;
        d += "<div class='media'>";
        if (a != null && a != "") {
            valid = !0;
            d += "<img src='" + a + "'>";
            c != null && c != "" && (d += VMM.createElement("div", c, "credit"));
            b != null && b != "" && (d += VMM.createElement("div", b, "caption"))
        }
        d += "</div>";
        return d
    };
    VMM.attachElement = function(a, b) {
        typeof jQuery != "undefined" && $(a).html(b)
    };
    VMM.appendElement = function(a, b) {
        typeof jQuery != "undefined" && $(a).append(b)
    };
    VMM.getHTML = function(a) {
        var b;
        if (typeof jQuery != "undefined") {
            b = $(a).html();
            return b
        }
    };
    VMM.getElement = function(a, b) {
        var c;
        if (typeof jQuery != "undefined") {
            b ? c = $(a).parent().get(0) : c = $(a).get(0);
            return c
        }
    };
    VMM.bindEvent = function(a, b, c, d) {
        var e,
        f = "click",
        g = {};
        c != null && c != "" && (f = c);
        g != null && g != "" && (g = d);
        typeof jQuery != "undefined" && $(a).bind(f, g, b)
    };
    VMM.unbindEvent = function(a, b, c) {
        var d,
        e = "click",
        f = {};
        c != null && c != "" && (e = c);
        typeof jQuery != "undefined" && $(a).unbind(e, b)
    };
    VMM.fireEvent = function(a, b, c) {
        var d,
        e = "click",
        f = [];
        b != null && b != "" && (e = b);
        c != null && c != "" && (f = c);
        typeof jQuery != "undefined" && $(a).trigger(e, f)
    };
    VMM.getJSON = function(a, b, c) {
        if (typeof jQuery != "undefined") {
            if (! (VMM.Browser.browser == "Explorer" && parseInt(VMM.Browser.version, 10) >= 8 && window.XDomainRequest)) return jQuery.getJSON(a, b, c);
            trace("it's ie");
            var d = a;
            if (d.match("^http://")) {
                trace("RUNNING GET JSON");
                return jQuery.getJSON(a, b, c)
            }
            if (!d.match("^https://")) return jQuery.getJSON(a, b, c);
            trace("RUNNING XDR");
            d = d.replace("https://", "http://");
            var e = new XDomainRequest;
            e.open("get", d);
            e.onload = function() {
                var a = VMM.parseJSON(e.responseText);
                trace(e.responseText);
                if (type.of(a) != "null" && type.of(a) != "undefined") return b(a);
                trace("IE JSON ERROR")
            };
            e.send()
        }
    };
    VMM.parseJSON = function(a) {
        if (typeof jQuery != "undefined") return $.parseJSON(a)
    };
    VMM.appendAndGetElement = function(a, b, c, d) {
        var e,
        f = "<div>",
        g = "",
        h = "";
        b != null && b != "" && (f = b);
        c != null && c != "" && (g = c);
        d != null && d != "" && (h = d);
        if (typeof jQuery != "undefined") {
            e = $(b);
            e.addClass(g);
            e.html(h);
            $(a).append(e)
        }
        return e
    };
    VMM.Element = {
        init: function() {
            return this
        },
        hide: function(a, b) {
            b != null && b != "" ? typeof jQuery != "undefined" && $(a).hide(b) : typeof jQuery != "undefined" && $(a).hide()
        },
        remove: function(a) {
            typeof jQuery != "undefined" && $(a).remove()
        },
        detach: function(a) {
            typeof jQuery != "undefined" && $(a).detach()
        },
        append: function(a, b) {
            typeof jQuery != "undefined" && $(a).append(b)
        },
        show: function(a, b) {
            b != null && b != "" ? typeof jQuery != "undefined" && $(a).show(b) : typeof jQuery != "undefined" && $(a).show()
        },
        load: function(a, b, c) {
            var d = {
                elem: a
            };
            d != null && d != "" && (d = c);
            typeof jQuery != "undefined" && $(a).load(d, b)
        },
        addClass: function(a, b) {
            typeof jQuery != "undefined" && $(a).addClass(b)
        },
        removeClass: function(a, b) {
            typeof jQuery != "undefined" && $(a).removeClass(b)
        },
        attr: function(a, b, c) {
            if (c != null && c != "") typeof jQuery != "undefined" && $(a).attr(b, c);
            else if (typeof jQuery != "undefined") return $(a).attr(b)
        },
        prop: function(a, b, c) {
            typeof jQuery == "undefined" || !/[1-9]\.[3-9].[1-9]/.test($.fn.jquery) ? VMM.Element.attribute(a, b, c) : $(a).prop(b, c)
        },
        attribute: function(a, b, c) {
            if (c != null && c != "") typeof jQuery != "undefined" && $(a).attr(b, c);
            else if (typeof jQuery != "undefined") return $(a).attr(b)
        },
        visible: function(a, b) {
            if (b != null) typeof jQuery != "undefined" && (b ? $(a).show(0) : $(a).hide(0));
            else if (typeof jQuery != "undefined") return $(a).is(":visible") ? !0: !1
        },
        css: function(a, b, c) {
            if (c != null && c != "") typeof jQuery != "undefined" && $(a).css(b, c);
            else if (typeof jQuery != "undefined") return $(a).css(b)
        },
        cssmultiple: function(a, b) {
            if (typeof jQuery != "undefined") return $(a).css(b)
        },
        offset: function(a) {
            var b;
            typeof jQuery != "undefined" && (b = $(a).offset());
            return b
        },
        position: function(a) {
            var b;
            typeof jQuery != "undefined" && (b = $(a).position());
            return b
        },
        width: function(a, b) {
            if (b != null && b != "") typeof jQuery != "undefined" && $(a).width(b);
            else if (typeof jQuery != "undefined") return $(a).width()
        },
        height: function(a, b) {
            if (b != null && b != "") typeof jQuery != "undefined" && $(a).height(b);
            else if (typeof jQuery != "undefined") return $(a).height()
        },
        toggleClass: function(a, b) {
            typeof jQuery != "undefined" && $(a).toggleClass(b)
        },
        each: function(a, b) {
            typeof jQuery != "undefined" && $(a).each(b)
        },
        html: function(a, b) {
            var c;
            if (typeof jQuery != "undefined") {
                c = $(a).html();
                return c
            }
            if (b != null && b != "") typeof jQuery != "undefined" && $(a).html(b);
            else {
                var c;
                if (typeof jQuery != "undefined") {
                    c = $(a).html();
                    return c
                }
            }
        },
        find: function(a, b) {
            if (typeof jQuery != "undefined") return $(a).find(b)
        },
        stop: function(a) {
            typeof jQuery != "undefined" && $(a).stop()
        },
        animate: function(a, b, c, d, e) {
            var f = "easein",
            g = 1e3,
            h = {};
            b != null && (b < 1 ? g = 1: g = Math.round(b));
            c != null && c != "" && (f = c);
            d != null ? h = d: h = {
                opacity: 0
            };
            if (VMM.Browser.device == "mobile" || VMM.Browser.device == "tablet") {
                var i = Math.round(g / 1500 * 10) / 10,
                j = i + "s";
                VMM.Element.css(a, "-webkit-transition", "all " + j + " ease");
                VMM.Element.css(a, "-moz-transition", "all " + j + " ease");
                VMM.Element.css(a, "-o-transition", "all " + j + " ease");
                VMM.Element.css(a, "-ms-transition", "all " + j + " ease");
                VMM.Element.css(a, "transition", "all " + j + " ease");
                VMM.Element.cssmultiple(a, h)
            } else typeof jQuery != "undefined" && (e != null && e != "" ? $(a).animate(h, {
                queue: !1,
                duration: g,
                easing: f,
                complete: e
            }) : $(a).animate(h, {
                queue: !1,
                duration: g,
                easing: f
            }))
        }
    }.init();
    VMM.TouchSlider = {
        createPanel: function(a, b, c, d, e, f) {
            VMM.TouchSlider.vertical = !1;
            VMM.TouchSlider.vertical = e;
            var g = d;
            VMM.TouchSlider.width = c;
            VMM.TouchSlider.height = f;
            VMM.TouchSlider.makeTouchable(a, b)
        },
        removePanel: function(a) {
            VMM.unbindEvent(a, VMM.TouchSlider.onTouchStart, "touchstart");
            VMM.unbindEvent(a, VMM.TouchSlider.onTouchMove, "touchmove");
            VMM.unbindEvent(a, VMM.TouchSlider.onTouchEnd, "touchend")
        },
        makeTouchable: function(a, b) {
            VMM.bindEvent(a, VMM.TouchSlider.onTouchStart, "touchstart", {
                element: b
            });
            VMM.bindEvent(a, VMM.TouchSlider.onTouchMove, "touchmove", {
                element: b
            });
            VMM.bindEvent(a, VMM.TouchSlider.onTouchEnd, "touchend", {
                element: b
            })
        },
        onTouchStart: function(a) {
            VMM.TouchSlider.touchStart(a.data.element, a);
            a.preventDefault();
            a.stopPropagation();
            return ! 0
        },
        onTouchEnd: function(a) {
            a.preventDefault();
            a.stopPropagation();
            if (VMM.TouchSlider.sliding) {
                VMM.TouchSlider.sliding = !1;
                VMM.TouchSlider.touchEnd(a.data.element, a);
                return ! 1
            }
            return ! 0
        },
        onTouchMove: function(a) {
            VMM.TouchSlider.touchMove(a.data.element, a);
            a.preventDefault();
            a.stopPropagation();
            return ! 1
        },
        getLeft: function(a) {
            return parseInt(VMM.Element.css(a, "left").substring(0, VMM.Element.css(a, "left").length - 2), 10)
        },
        getTop: function(a) {
            return parseInt(VMM.Element.css(a, "top").substring(0, VMM.Element.css(a, "top").length - 2), 10)
        },
        touchStart: function(a, b) {
            VMM.Element.css(a, "-webkit-transition-duration", "0");
            VMM.TouchSlider.startX = b.originalEvent.touches[0].screenX;
            VMM.TouchSlider.startY = b.originalEvent.touches[0].screenY;
            VMM.TouchSlider.startLeft = VMM.TouchSlider.getLeft(a);
            VMM.TouchSlider.startTop = VMM.TouchSlider.getTop(a);
            VMM.TouchSlider.touchStartTime = (new Date).getTime()
        },
        touchEnd: function(a, b) {
            if (VMM.TouchSlider.getLeft(a) > 0) {
                VMM.TouchSlider.vertical ? VMM.Element.animate(a, 1e3, "", {
                    top: 0
                }) : VMM.Element.animate(a, 1e3, "", {
                    left: 0
                });
                VMM.TouchSlider.startX = null;
                VMM.TouchSlider.startY = null;
                VMM.fireEvent(a, "TOUCHUPDATE", [0])
            } else VMM.TouchSlider.slideMomentum(a, b)
        },
        slideMomentum: function(a, b) {
            var c = ((new Date).getTime() - VMM.TouchSlider.touchStartTime) * 10,
            d = c,
            e = VMM.TouchSlider.getLeft(a),
            f = VMM.TouchSlider.getTop(a),
            g = 6e3 * (Math.abs(VMM.TouchSlider.startLeft) - Math.abs(e)),
            h = 6e3 * (Math.abs(VMM.TouchSlider.startTop) - Math.abs(f));
            c = Math.round(g / c);
            slideAdjustY = Math.round(h / c);
            var i = c + e,
            j = slideAdjustY + f,
            k = j % VMM.TouchSlider.height,
            l = i % VMM.TouchSlider.width,
            m = {
                top: Math.min(0, j),
                left: Math.min(0, i),
                time: d
            };
            VMM.fireEvent(a, "TOUCHUPDATE", [m]);
            VMM.TouchSlider.startX = null;
            VMM.TouchSlider.startY = null
        },
        doSlide: function(a, b, c) {
            VMM.Element.css(a, "-webkit-transition-property", "left");
            VMM.Element.css(a, "-webkit-transition-duration", c);
            VMM.Element.css(a, "left", b)
        },
        touchMove: function(a, b) {
            !! VMM.TouchSlider.sliding;
            VMM.TouchSlider.sliding = !0;
            if (VMM.TouchSlider.vertical) if (VMM.TouchSlider.startY > b.originalEvent.touches[0].screenY) {
                VMM.Element.css(a, "top", -(VMM.TouchSlider.startY - b.originalEvent.touches[0].screenY - VMM.TouchSlider.startTop));
                VMM.TouchSlider.slidingTop = !0
            } else {
                var c = b.originalEvent.touches[0].screenY - VMM.TouchSlider.startY + VMM.TouchSlider.startTop;
                VMM.Element.css(a, "top", -(VMM.TouchSlider.startY - b.originalEvent.touches[0].screenY - VMM.TouchSlider.startTop));
                VMM.TouchSlider.slidingTop = !1
            } else if (VMM.TouchSlider.startX > b.originalEvent.touches[0].screenX) {
                VMM.Element.css(a, "left", -(VMM.TouchSlider.startX - b.originalEvent.touches[0].screenX - VMM.TouchSlider.startLeft));
                VMM.TouchSlider.slidingLeft = !0
            } else {
                var d = b.originalEvent.touches[0].screenX - VMM.TouchSlider.startX + VMM.TouchSlider.startLeft;
                VMM.Element.css(a, "left", -(VMM.TouchSlider.startX - b.originalEvent.touches[0].screenX - VMM.TouchSlider.startLeft));
                VMM.TouchSlider.slidingLeft = !1
            }
        }
    };
    VMM.hideUrlBar = function() {
        var a = window,
        b = a.document;
        if (!location.hash || !a.addEventListener) {
            window.scrollTo(0, 1);
            var c = 1,
            d = setInterval(function() {
                if (b.body) {
                    clearInterval(d);
                    c = "scrollTop" in b.body ? b.body.scrollTop: 1;
                    a.scrollTo(0, c === 1 ? 0: 1)
                }
            },
            15);
            a.addEventListener("load",
                function() {
                    setTimeout(function() {
                        a.scrollTo(0, c === 1 ? 0: 1)
                    },
                    0)
                },
                !1)
        }
    };
    VMM.DragSlider = {
        createPanel: function(a, b, c, d, e) {
            var f = d;
            VMM.DragSlider.width = c;
            VMM.DragSlider.makeDraggable(a, b);
            VMM.DragSlider.drag_elem = a;
            VMM.DragSlider.sticky = e
        },
        makeDraggable: function(a, b) {
            VMM.bindEvent(a, VMM.DragSlider.onDragStart, "mousedown", {
                element: b,
                delement: a
            });
            VMM.bindEvent(a, VMM.DragSlider.onDragEnd, "mouseup", {
                element: b,
                delement: a
            });
            VMM.bindEvent(a, VMM.DragSlider.onDragLeave, "mouseleave", {
                element: b,
                delement: a
            })
        },
        cancelSlide: function(a) {
            VMM.unbindEvent(VMM.DragSlider.drag_elem, VMM.DragSlider.onDragMove, "mousemove");
            return ! 0
        },
        onDragLeave: function(a) {
            VMM.unbindEvent(a.data.delement, VMM.DragSlider.onDragMove, "mousemove");
            a.preventDefault();
            a.stopPropagation();
            return ! 0
        },
        onDragStart: function(a) {
            VMM.DragSlider.dragStart(a.data.element, a.data.delement, a);
            a.preventDefault();
            a.stopPropagation();
            return ! 0
        },
        onDragEnd: function(a) {
            a.preventDefault();
            a.stopPropagation();
            if (VMM.DragSlider.sliding) {
                VMM.DragSlider.sliding = !1;
                VMM.DragSlider.dragEnd(a.data.element, a.data.delement, a);
                return ! 1
            }
            return ! 0
        },
        onDragMove: function(a) {
            VMM.DragSlider.dragMove(a.data.element, a);
            a.preventDefault();
            a.stopPropagation();
            return ! 1
        },
        dragStart: function(a, b, c) {
            VMM.DragSlider.startX = c.pageX;
            VMM.DragSlider.startLeft = VMM.DragSlider.getLeft(a);
            VMM.DragSlider.dragStartTime = (new Date).getTime();
            VMM.DragSlider.dragWidth = VMM.Element.width(b);
            var d = Math.round(VMM.DragSlider.startX - c.pageX - VMM.DragSlider.startLeft);
            VMM.Element.stop(a);
            VMM.bindEvent(b, VMM.DragSlider.onDragMove, "mousemove", {
                element: a
            })
        },
        dragEnd: function(a, b, c) {
            VMM.unbindEvent(b, VMM.DragSlider.onDragMove, "mousemove");
            VMM.DragSlider.getLeft(a) > 0 || VMM.DragSlider.dragMomentum(a, c)
        },
        dragMove: function(a, b) {
            !! VMM.DragSlider.sliding;
            VMM.DragSlider.sliding = !0;
            if (VMM.DragSlider.startX > b.pageX) {
                VMM.Element.css(a, "left", -(VMM.DragSlider.startX - b.pageX - VMM.DragSlider.startLeft));
                VMM.DragSlider.slidingLeft = !0
            } else {
                var c = b.pageX - VMM.DragSlider.startX + VMM.DragSlider.startLeft;
                VMM.Element.css(a, "left", -(VMM.DragSlider.startX - b.pageX - VMM.DragSlider.startLeft));
                VMM.DragSlider.slidingLeft = !1
            }
        },
        dragMomentum: function(a, b) {
            var c = ((new Date).getTime() - VMM.DragSlider.dragStartTime) * 10,
            d = c,
            e = VMM.DragSlider.getLeft(a),
            f = 6e3 * (Math.abs(VMM.DragSlider.startLeft) - Math.abs(e));
            c = Math.round(f / c);
            var g = e + c,
            h = g % VMM.DragSlider.width,
            i = {
                left: Math.min(g),
                time: d
            };
            VMM.fireEvent(a, "DRAGUPDATE", [i]);
            var j = "easeOutExpo";
            i.time > 0 && VMM.Element.animate(a, i.time, j, {
                left: i.left
            })
        },
        getLeft: function(a) {
            return parseInt(VMM.Element.css(a, "left").substring(0, VMM.Element.css(a, "left").length - 2), 10)
        }
    };
    VMM.Browser = {
        init: function() {
            this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
            this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "an unknown version";
            this.OS = this.searchString(this.dataOS) || "an unknown OS";
            this.device = this.searchDevice(navigator.userAgent)
        },
        searchDevice: function(a) {
            return a.match(/Android/i) || a.match(/iPhone|iPod/i) ? "mobile": a.match(/iPad/i) ? "tablet": a.match(/BlackBerry/i) || a.match(/IEMobile/i) ? "other mobile": "desktop"
        },
        searchString: function(a) {
            for (var b = 0; b < a.length; b++) {
                var c = a[b].string,
                d = a[b].prop;
                this.versionSearchString = a[b].versionSearch || a[b].identity;
                if (c) {
                    if (c.indexOf(a[b].subString) != -1) return a[b].identity
                } else if (d) return a[b].identity
            }
        },
        searchVersion: function(a) {
            var b = a.indexOf(this.versionSearchString);
            if (b == -1) return;
            return parseFloat(a.substring(b + this.versionSearchString.length + 1))
        },
        dataBrowser: [{
            string: navigator.userAgent,
            subString: "Chrome",
            identity: "Chrome"
        },
        {
            string: navigator.userAgent,
            subString: "OmniWeb",
            versionSearch: "OmniWeb/",
            identity: "OmniWeb"
        },
        {
            string: navigator.vendor,
            subString: "Apple",
            identity: "Safari",
            versionSearch: "Version"
        },
        {
            prop: window.opera,
            identity: "Opera",
            versionSearch: "Version"
        },
        {
            string: navigator.vendor,
            subString: "iCab",
            identity: "iCab"
        },
        {
            string: navigator.vendor,
            subString: "KDE",
            identity: "Konqueror"
        },
        {
            string: navigator.userAgent,
            subString: "Firefox",
            identity: "Firefox"
        },
        {
            string: navigator.vendor,
            subString: "Camino",
            identity: "Camino"
        },
        {
            string: navigator.userAgent,
            subString: "Netscape",
            identity: "Netscape"
        },
        {
            string: navigator.userAgent,
            subString: "MSIE",
            identity: "Explorer",
            versionSearch: "MSIE"
        },
        {
            string: navigator.userAgent,
            subString: "Gecko",
            identity: "Mozilla",
            versionSearch: "rv"
        },
        {
            string: navigator.userAgent,
            subString: "Mozilla",
            identity: "Netscape",
            versionSearch: "Mozilla"
        }],
        dataOS: [{
            string: navigator.platform,
            subString: "Win",
            identity: "Windows"
        },
        {
            string: navigator.platform,
            subString: "Mac",
            identity: "Mac"
        },
        {
            string: navigator.userAgent,
            subString: "iPhone",
            identity: "iPhone/iPod"
        },
        {
            string: navigator.userAgent,
            subString: "iPad",
            identity: "iPad"
        },
        {
            string: navigator.platform,
            subString: "Linux",
            identity: "Linux"
        }]
    };
    VMM.Browser.init();
    VMM.MediaElement = {
        init: function() {
            return this
        },
        thumbnail: function(a, b, c) {
            _w = 32;
            _h = 32;
            b != null && b != "" && (_w = b);
            c != null && c != "" && (_h = c);
            if (a.media != null && a.media != "") {
                _valid = !0;
                var d = "",
                e = {};
                e = VMM.MediaType(a.media);
                if (e.type == "image") {
                    d = "<div class='thumbnail'><img src='" + e.id + "' width='" + _w + "px' height='" + _h + "px'></div>";
                    return d
                }
                if (e.type == "flickr") {
                    d = "<div class='thumbnail'><img id='flickr_" + e.id + "_thumb' width='" + _w + "px' height='" + _h + "px'></div>";
                    return d
                }
                if (e.type == "youtube") {
				  
					 
                    d = "<div class='thumbnail thumb-youtube'><img src='http://img.youtube.com/vi/"+e.id+"/default.jpg' width='" + _w + "px' height='" + _h + "px' /></div>";
                   
                    return d
                }
                if (e.type != "googledoc") {
                    if (e.type == "vimeo") {
                        d = "<div class='thumbnail vimeo'></div>";
                         
                       
                        return d
                    }
                    if (e.type == "dailymotion") {
                        d = "<div class='thumbnail dailymotion'></div>";
                        return d
                    }
                    if (e.type == "twitter") {
                        d = "<div class='thumbnail twitter'></div>";
                        return d
                    }
                    if (e.type == "twitter-ready") {
                        d = "<div class='thumbnail twitter'></div>";
                        return d
                    }
                    if (e.type == "soundcloud") {
                        d = "<div class='thumbnail soundcloud'></div>";
                        return d
                    }
                    if (e.type == "google-map") {
					
                        d = "<div class='thumbnail map'></div>";
                        return d
                    }
                    if (e.type == "unknown") {
                        d = "";
                        return d
                    }
                    if (e.type == "website") {
                        d = "<div class='thumbnail'><img src='http://api.snapito.com/web/9c43eabca76403e97eee28a6fa06df7385c9e712/sc?url=" + e.id + "' width='" + _w + "px' height='" + _h + "px'></div>";
                        return d
                    }
                    d = "<div class='thumbnail'></div>";
                    return d
                }
                d = ""
            }
        },
        create: function(a, b, c, d, e) {
            _return = c;
            _w = 500;
            _h = 400;
            $mediacontainer = a;
            var f = !1;
            d != null && d != "" && (_w = d);
            e != null && e != "" && (_h = e);
            if (b.media != null && b.media != "") {
                f = !0;
                var g = "",
                h = "",
                i = "",
                j = {},
                k = _h - 50,
                l = !1;
                b.credit != null && b.credit != "" && (i = "<div class='credit'>" + VMM.Util.linkify_with_twitter(b.credit, "_blank") + "</div>");
                b.caption != null && b.caption != "" && (h = "<div class='caption'>" + VMM.Util.linkify_with_twitter(b.caption, "_blank") + "</div>");
                j = VMM.MediaType(b.media);
                if (j.type == "image") g = "<img src='" + j.id + "'>";
                else if (j.type == "flickr") {
                    var m = "flickr_" + j.id;
                    g = "<a href='" + j.link + "' target='_blank'><img id='" + m + "_large" + "'></a>";
                    VMM.ExternalAPI.flickr.getPhoto(j.id, "#" + m)
                } else if (j.type == "googledoc") j.id.match(/docs.google.com/i) ? g = "<iframe class='media-frame doc' frameborder='0' width='100%' height='100%' src='" + j.id + "&embedded=true'></iframe>": g = "<iframe class='media-frame doc' frameborder='0' width='100%' height='100%' src='http://docs.google.com/viewer?url=" + j.id + "&embedded=true'></iframe>";
                else if (j.type == "youtube") {
                    g = "<iframe class='media-frame video youtube' frameborder='0' width='100%' height='100%' src='http://www.youtube.com/embed/" + j.id + "'></iframe>";
                    VMM.ExternalAPI.youtube.init(j.id)
                } else if (j.type == "vimeo") g = "<iframe class='media-frame video vimeo' frameborder='0' width='100%' height='100%' src='http://player.vimeo.com/video/" + j.id + "?title=0&amp;byline=0&amp;portrait=0&amp;color=ffffff'></iframe>";
                else if(j.type == "dailymotion") {
                    g = "<iframe class='media-frame video dailymotion' frameborder='0' width='100%' height='100%' src='http://www.dailymotion.com/embed/video/" + j.id + "'></iframe>";
                }
                else if (j.type == "twitter") {
                    g = "<div class='twitter' id='twitter_" + j.id + "'>Loading Tweet</div>";
                    trace("TWITTER");
                    VMM.ExternalAPI.twitter.prettyHTML(j.id);
                    l = !0
                } else if (j.type == "twitter-ready") g = j.id;
                else if (j.type == "soundcloud") {
                    var n = "soundcloud_" + VMM.Util.unique_ID(5);
                    g = "<div class='media-frame soundcloud' id='" + n + "'>Loading Sound</div>";
                    VMM.ExternalAPI.soundcloud.getSound(j.id, n)
                } else if (j.type == "google-map") {
                    var o = "googlemap_" + VMM.Util.unique_ID(7);
                    g = "<div class='media-frame map' id='" + o + "'>Loading Map...</div>";
                    VMM.ExternalAPI.googlemaps.getMap(j.id, o)
                } else if (j.type == "unknown") {
                    trace("NO KNOWN MEDIA TYPE FOUND TRYING TO JUST PLACE THE HTML");
                    g = VMM.Util.properQuotes(j.id)
                } else if (j.type == "website") g = "<a href='" + j.id + "' target='_blank'>" + "<img src='http://api.snapito.com/web/9c43eabca76403e97eee28a6fa06df7385c9e712/lc?url=" + j.id + "'></a>";
                else {
                    trace("NO KNOWN MEDIA TYPE FOUND");
                    trace(j.type)
                }
                g = "<div class='media-container' >" + g + i + h + "</div>";
                if (_return) return l ? "<div class='media text-media'><div class='media-wrapper'>" + g + "</div></div>": "<div class='media'><div class='media-wrapper'>" + g + "</div></div>";
                VMM.appendElement($mediacontainer, g);
                VMM.appendElement($mediacontainer, i);
                VMM.appendElement($mediacontainer, h)
            }
        }
    }.init();
    VMM.MediaType = function(a) {
        var b = !1,
        c = {};
        if (a.match("div class='twitter'")) {
            c.type = "twitter-ready";
            c.id = a;
            b = !0
        } else if (a.match("(www.)?youtube|youtu.be")) {
            a.match("embed") ? youtube_id = a.split(/embed\//)[1].split('"')[0] : youtube_id = a.split(/v\/|v=|youtu\.be\//)[1].split(/[?&]/)[0];
            c.type = "youtube";
            c.id = youtube_id;
            b = !0
        } else if (a.match("(player.)?vimeo.com")) {
            vimeo_id = a.split(/video\/|\/\/vimeo\.com\//)[1].split(/[?&]/)[0];
            c.type = "vimeo";
            c.id = vimeo_id;
            b = !0
        } else if (a.match("(player.)?dailymotion.com")) {
            dailymotion_id = a.split(/video\/|\/\/dailymotion\.com\//)[1].split(/[_]/)[0];
            c.type = "dailymotion";
            c.id = dailymotion_id;
            b = !0
        } else if (a.match("(player.)?soundcloud.com")) {
            c.type = "soundcloud";
            c.id = a;
            b = !0
        } else if (a.match("(www.)?twitter.com")) {
            trace("TWITTER MATCH");
            a.match("status/") ? twitter_id = a.split("status/")[1] : a.match("statuses/") ? twitter_id = a.split("statuses/")[1] : twitter_id = "";
            c.type = "twitter";
            c.id = twitter_id;
            b = !0
        } else if (a.match("maps.google")) {
            c.type = "google-map";
            c.id = a.split(/src=['|"][^'|"]*?['|"]/gi);
            b = !0
        } else if (a.match("flickr.com/photos")) {
            c.type = "flickr";
            c.id = a.split("photos/")[1].split("/")[1];
            c.link = a;
            b = !0
        } else if (a.match(/jpg|jpeg|png|gif/i)) {
            c.type = "image";
            c.id = a;
            b = !0
        } else if (VMM.FileExtention.googleDocType(a)) {
            c.type = "googledoc";
            c.id = a;
            b = !0
        } else if (a.indexOf("http://") == 0) {
            c.type = "website";
            c.id = a;
            b = !0
        } else {
            trace("unknown media");
            c.type = "unknown";
            c.id = a;
            b = !0
        }
        if (b) return c;
        trace("No valid media id detected");
        trace(a);
        return ! 1
    };
    VMM.FileExtention = {
        googleDocType: function(a) {
            var b = a,
            c = "";
            c = b.substr(b.length - 5, 5);
            var d = ["DOC", "DOCX", "XLS", "XLSX", "PPT", "PPTX", "PDF", "PAGES", "AI", "PSD", "TIFF", "DXF", "SVG", "EPS", "PS", "TTF", "XPS", "ZIP", "RAR"],
            e = !1;
            for (var f = 0; f < d.length; f++) if (c.toLowerCase().match(d[f].toString().toLowerCase()) || b.match("docs.google.com")) e = !0;
            return e
        }
    };
    VMM.ExternalAPI = {
        twitter: {
            tweetArray: [],
            getHTML: function(a) {
                var b = "http://api.twitter.com/1.1/statuses/oembed.json?id=" + a + "&callback=?";
                VMM.getJSON(b, VMM.ExternalAPI.twitter.onJSONLoaded)
            },
            onJSONLoaded: function(a) {
                trace("TWITTER JSON LOADED");
                var b = a.id;
                VMM.attachElement("#" + b, VMM.Util.linkify_with_twitter(a.html))
            },
            parseTwitterDate: function(a) {
                var b = new Date(Date.parse(a));
                return b
            },
            prettyParseTwitterDate: function(a) {
                var b = new Date(Date.parse(a));
                return VMM.Util.date.prettyDate(b, !0)
            },
            getTweets: function(a) {
                var b = [],
                c = a.length;
                for (var d = 0; d < a.length; d++) {
                    var e = "";
                    a[d].tweet.match("status/") ? e = a[d].tweet.split("status/")[1] : a[d].tweet.match("statuses/") ? e = a[d].tweet.split("statuses/")[1] : e = "";
                    var f = "http://api.twitter.com/1.1/statuses/show.json?id=" + e + "&include_entities=true&callback=?";
                    VMM.getJSON(f,
                        function(a) {
                            var d = {},
                            e = "<div class='twitter'><blockquote><p>",
                            f = VMM.Util.linkify_with_twitter(a.text, "_blank");
                            e += f;
                            e += "</p>";
                            e += "— " + a.user.name + " (<a href='https://twitter.com/" + a.user.screen_name + "'>@" + a.user.screen_name + "</a>) <a href='https://twitter.com/" + a.user.screen_name + "/status/" + a.id + "'>" + VMM.ExternalAPI.twitter.prettyParseTwitterDate(a.created_at) + " </a></blockquote></div>";
                            d.content = e;
                            d.raw = a;
                            b.push(d);
                            if (b.length == c) {
                                var g = {
                                    tweetdata: b
                                };
                                VMM.fireEvent(global, "TWEETSLOADED", g)
                            }
                        }).success(function() {
                        trace("second success")
                    }).error(function() {
                        trace("error")
                    }).complete(function() {
                        trace("complete")
                    })
                }
            },
            getTweetSearch: function(a, b) {
                var c = 40;
                b != null && b != "" && (c = b);
                var d = "http://search.twitter.com/search.json?q=" + a + "&rpp=" + c + "&include_entities=true&result_type=mixed",
                e = [];
                VMM.getJSON(d,
                    function(a) {
                        for (var b = 0; b < a.results.length; b++) {
                            var c = {},
                            d = "<div class='twitter'><blockquote><p>",
                            f = VMM.Util.linkify_with_twitter(a.results[b].text, "_blank");
                            d += f;
                            d += "</p>";
                            d += "— " + a.results[b].from_user_name + " (<a href='https://twitter.com/" + a.results[b].from_user + "'>@" + a.results[b].from_user + "</a>) <a href='https://twitter.com/" + a.results[b].from_user + "/status/" + a.id + "'>" + VMM.ExternalAPI.twitter.prettyParseTwitterDate(a.results[b].created_at) + " </a></blockquote></div>";
                            c.content = d;
                            c.raw = a.results[b];
                            e.push(c)
                        }
                        var g = {
                            tweetdata: e
                        };
                        VMM.fireEvent(global, "TWEETSLOADED", g)
                    })
            },
            prettyHTML: function(a) {
                var a = a.toString(),
                b = {
                    twitterid: a
                },
                c = "http://api.twitter.com/1.1/statuses/show.json?id=" + a + "&include_entities=true&callback=?";
                trace("id " + a);
                var d = setTimeout(VMM.ExternalAPI.twitter.notFoundError, 4e3, a);
                VMM.getJSON(c, VMM.ExternalAPI.twitter.formatJSON).error(function(b, c, d) {
                    trace("TWITTER error");
                    trace("TWITTER ERROR: " + c + " " + b.responseText);
                    VMM.attachElement("#twitter_" + a, "<p>ERROR LOADING TWEET " + a + "</p>")
                }).success(function() {
                    clearTimeout(d)
                })
            },
            notFoundError: function(a) {
                trace("TWITTER JSON ERROR TIMEOUT " + a);
                VMM.attachElement("#twitter_" + a, "<p>TWEET NOT FOUND " + a + "</p>")
            },
            formatJSON: function(a) {
                trace("TWITTER JSON LOADED F");
                trace(a);
                var b = a.id_str,
                c = "<blockquote><p>",
                d = VMM.Util.linkify_with_twitter(a.text, "_blank");
                c += d;
                c += "</p></blockquote>";
                c += " <a href='https://twitter.com/" + a.user.screen_name + "/status/" + a.id + "' target='_blank' alt='link to original tweet' title='link to original tweet'>" + "<span class='created-at'></span>" + " </a>";
                c += "<div class='vcard author'>";
                c += "<a class='screen-name url' href='https://twitter.com/" + a.user.screen_name + "' data-screen-name='" + a.user.screen_name + "' target='_blank'>";
                c += "<span class='avatar'><img src=' " + a.user.profile_image_url + "'  alt=''></span>";
                c += "<span class='fn'>" + a.user.name + "</span>";
                c += "<span class='nickname'>@" + a.user.screen_name + "</span>";
                c += "</a>";
                c += "</div>";
                VMM.attachElement("#twitter_" + b.toString(), c)
            }
        },
        googlemaps: {
            getMap: function(a, b) {
                var c = VMM.Util.getUrlVars(a);
                trace(c);
                var d = "http://maps.googleapis.com/maps/api/js?key=" + Aes.Ctr.decrypt(VMM.master_config.keys.google, VMM.master_config.vp, 256) + "&libraries=places&sensor=false&callback=VMM.ExternalAPI.googlemaps.onMapAPIReady",
                e = {
                    url: a,
                    vars: c,
                    id: b
                };
                if (VMM.master_config.googlemaps.active) VMM.master_config.googlemaps.createMap(e);
                else {
                    VMM.master_config.googlemaps.que.push(e);
                    VMM.master_config.googlemaps.api_loaded || VMM.LoadLib.js(d,
                        function() {
                            trace("Google Maps API Library Loaded")
                        })
                }
            },
            onMapAPIReady: function() {
                VMM.master_config.googlemaps.map_active = !0;
                VMM.master_config.googlemaps.places_active = !0;
                VMM.ExternalAPI.googlemaps.onAPIReady()
            },
            onPlacesAPIReady: function() {
                VMM.master_config.googlemaps.places_active = !0;
                VMM.ExternalAPI.googlemaps.onAPIReady()
            },
            onAPIReady: function() {
                if (!VMM.master_config.googlemaps.active && VMM.master_config.googlemaps.map_active && VMM.master_config.googlemaps.places_active) {
                    VMM.master_config.googlemaps.active = !0;
                    for (var a = 0; a < VMM.master_config.googlemaps.que.length; a++) VMM.ExternalAPI.googlemaps.createMap(VMM.master_config.googlemaps.que[a])
                }
            },
            map_subdomains: ["", "a.", "b.", "c.", "d."],
            map_attribution: {
                stamen: "Map tiles by <a href='http://stamen.com'>Stamen Design</a>, under <a href='http://creativecommons.org/licenses/by/3.0'>CC BY 3.0</a>. Data by <a href='http://openstreetmap.org'>OpenStreetMap</a>, under <a href='http://creativecommons.org/licenses/by-sa/3.0'>CC BY SA</a>.",
                apple: "Map data &copy; 2012  Apple, Imagery &copy; 2012 Apple"
            },
            map_providers: {
                toner: {
                    url: "http://{S}tile.stamen.com/toner/{Z}/{X}/{Y}.png",
                    minZoom: 5,
                    maxZoom: 20,
                    attribution: "stamen"
                },
                "toner-lines": {
                    url: "http://{S}tile.stamen.com/toner-lines/{Z}/{X}/{Y}.png",
                    minZoom: 5,
                    maxZoom: 20,
                    attribution: "stamen"
                },
                "toner-labels": {
                    url: "http://{S}tile.stamen.com/toner-labels/{Z}/{X}/{Y}.png",
                    minZoom: 5,
                    maxZoom: 20,
                    attribution: "stamen"
                },
                sterrain: {
                    url: "http://{S}tile.stamen.com/terrain/{Z}/{X}/{Y}.jpg",
                    minZoom: 4,
                    maxZoom: 20,
                    attribution: "stamen"
                },
                apple: {
                    url: "http://gsp2.apple.com/tile?api=1&style=slideshow&layers=default&lang=en_US&z={z}&x={x}&y={y}&v=9",
                    minZoom: 4,
                    maxZoom: 20,
                    attribution: "apple"
                },
                watercolor: {
                    url: "http://{S}tile.stamen.com/watercolor/{Z}/{X}/{Y}.jpg",
                    minZoom: 3,
                    maxZoom: 16,
                    attribution: "stamen"
                }
            },
            createMap: function(a) {
                function c(a) {
                    if (a in VMM.ExternalAPI.googlemaps.map_providers) {
                        b = VMM.ExternalAPI.googlemaps.map_attribution[VMM.ExternalAPI.googlemaps.map_providers[a].attribution];
                        return VMM.ExternalAPI.googlemaps.map_providers[a]
                    }
                    throw 'No such provider: "' + a + '"'
                }
                function o() {
                    var b = a.url + "&output=kml";
                    b = b.replace("&output=embed", "");
                    var c = new google.maps.KmlLayer(b, {
                        preserveViewport: !0
                    });
                    c.setMap(m);
                    var d = new google.maps.InfoWindow;
                    google.maps.event.addListenerOnce(c, "defaultviewport_changed",
                        function() {
                            h && m.panTo(e);
                            i ? m.setZoom(g) : m.fitBounds(c.getDefaultViewport())
                        });
                    google.maps.event.addListener(c, "click",
                        function(a) {
                            function c(a) {
                                d.setContent(a);
                                d.open(m)
                            }
                            var b = a.featureData.description;
                            trace(a.featureData.infoWindowHtml);
                            c(b)
                        })
                }
                trace(VMM.ExternalAPI.googlemaps.stamen_map_attribution);
                var b = "";
                google.maps.VeriteMapType = function(a) {
                    var b = c(a);
                    return google.maps.ImageMapType.call(this, {
                        getTileUrl: function(a, c) {
                            var d = (c + a.x + a.y) % VMM.ExternalAPI.googlemaps.map_subdomains.length;
                            return [b.url.replace("{S}", VMM.ExternalAPI.googlemaps.map_subdomains[d]).replace("{Z}", c).replace("{X}", a.x).replace("{Y}", a.y).replace("{z}", c).replace("{x}", a.x).replace("{y}", a.y)]
                        },
                        tileSize: new google.maps.Size(256, 256),
                        name: a,
                        minZoom: b.minZoom,
                        maxZoom: b.maxZoom
                    })
                };
                google.maps.VeriteMapType.prototype = new google.maps.ImageMapType("_");
                var d;
                type.of(VMM.master_config.Timeline.maptype) == "string" ? d = VMM.master_config.Timeline.maptype: d = "toner";
                var e = new google.maps.LatLng(41.875696, -87.624207),
                f,
                g = 11,
                h = !1,
                i = !1,
                j;
                if (type.of(VMM.Util.getUrlVars(a.url)["ll"]) == "string") {
                    h = !0;
                    f = VMM.Util.getUrlVars(a.url).ll.split(",");
                    e = new google.maps.LatLng(parseFloat(f[0]), parseFloat(f[1]))
                } else if (type.of(VMM.Util.getUrlVars(a.url)["sll"]) == "string") {
                    h = !0;
                    f = VMM.Util.getUrlVars(a.url).sll.split(",");
                    e = new google.maps.LatLng(parseFloat(f[0]), parseFloat(f[1]))
                }
                if (type.of(VMM.Util.getUrlVars(a.url)["z"]) == "string") {
                    i = !0;
                    g = parseFloat(VMM.Util.getUrlVars(a.url).z)
                }
                var k = {
                    zoom: g,
                    disableDefaultUI: !0,
                    mapTypeControl: !1,
                    zoomControl: !0,
                    zoomControlOptions: {
                        style: google.maps.ZoomControlStyle.SMALL,
                        position: google.maps.ControlPosition.TOP_RIGHT
                    },
                    center: e,
                    mapTypeId: d,
                    mapTypeControlOptions: {
                        mapTypeIds: [d]
                    }
                },
                l = a.id.toString() + "_gmap";
                VMM.attachElement("#" + a.id, "<div class='google-map' id='" + l + "' style='width=100%;height=100%;'></div>");
                var m = new google.maps.Map(document.getElementById(l), k);
                m.mapTypes.set(d, new google.maps.VeriteMapType(d));
                var n = "<div class='map-attribution'><div class='attribution-text'>" + b + "</div></div>";
                VMM.appendElement("#" + l, n);
                o()
            }
        },
        flickr: {
            getPhoto: function(a, b) {
                var c = "http://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=" + Aes.Ctr.decrypt(VMM.master_config.keys.flickr, VMM.master_config.vp, 256) + "&photo_id=" + a + "&format=json&jsoncallback=?";
                VMM.getJSON(c, VMM.ExternalAPI.flickr.setPhoto)
            },
            setPhoto: function(a) {
                var b = a.sizes.size[0].url.split("photos/")[1].split("/")[1],
                c = "flickr_" + b,
                d = c + "_large",
                e = c + "_thumb",
                f = a.sizes.size[a.sizes.size.length - 1].source,
                g = a.sizes.
                size[0].source;
                VMM.Element.attr("#" + d, "src", f);
                VMM.Element.attr("#" + e, "src", g)
            }
        },
        soundcloud: {
            getSound: function(a, b) {
                var c = "http://soundcloud.com/oembed?url=" + a + "&format=js&callback=?";
                VMM.getJSON(c,
                    function(a) {
                        VMM.attachElement("#" + b, a.html)
                    })
            }
        },
        youtube: {
            init: function(a) {
                if (VMM.master_config.youtube.active) VMM.master_config.youtube.createPlayer(a);
                else {
                    VMM.master_config.youtube.que.push(a);
                    VMM.master_config.youtube.api_loaded || VMM.LoadLib.js("http://www.youtube.com/player_api",
                        function() {
                            trace("YouTube API Library Loaded")
                        })
                }
            },
            onAPIReady: function() {
                trace("YOUTUBE API READY");
                VMM.master_config.youtube.active = !0;
                for (var a = 0; a < VMM.master_config.youtube.que.length; a++) VMM.ExternalAPI.youtube.createPlayer(VMM.master_config.youtube.que[a])
            },
            createPlayer: function(a) {
                var b = {
                    active: !1,
                    player: {},
                    name: "youtube_" + a,
                    playing: !1
                };
                b.player["youtube_" + a] = new YT.Player("youtube_" + a, {
                    height: "390",
                    width: "640",
                    playerVars: {
                        enablejsapi: 1,
                        color: "white",
                        showinfo: 0,
                        theme: "light",
                        rel: 0,
                        origin: "http://timeline.verite.co"
                    },
                    videoId: a,
                    events: {
                        onReady: VMM.ExternalAPI.youtube.onPlayerReady,
                        onStateChange: VMM.ExternalAPI.youtube.onStateChange
                    }
                });
                VMM.master_config.youtube.array.push(b)
            },
            stopPlayers: function() {
                for (var a = 0; a < VMM.master_config.youtube.array.length; a++) if (VMM.master_config.youtube.array[a].playing) {
                    var b = VMM.master_config.youtube.array[a].name;
                    VMM.master_config.youtube.array[a].player[b].stopVideo()
                }
            },
            onStateChange: function(a) {
                for (var b = 0; b < VMM.master_config.youtube.array.length; b++) {
                    var c = VMM.master_config.youtube.array[b].name;
                    VMM.master_config.youtube.array[b].player[c] == a.target && a.data == YT.PlayerState.PLAYING && (VMM.master_config.youtube.array[b].playing = !0)
                }
            },
            onPlayerReady: function(a) {}
        }
    };
    VMM.Media = function(a, b, c, d) {
        function n() {}
        var e = {},
        f = !1,
        g = {
            width: 720,
            height: 400,
            content_width: 720,
            content_height: 400,
            ease: "easeInOutExpo",
            duration: 1e3,
            spacing: 15
        },
        h = "",
        i = "",
        j = "",
        k = "",
        l = a;
        b != null && b != "" && (g.width = b);
        c != null && c != "" && (g.height = c);
        this.init = function(a) {
            typeof a != "undefined" ? this.setData(a) : trace("WAITING ON DATA")
        };
        var m = function(a, b, c) {
            h = VMM.appendAndGetElement(l, "<div>", "media");
            i = VMM.appendAndGetElement(h, "<div>", "container");
            j = VMM.appendAndGetElement(i, "<div>", "media-container");
            if (e.media != null && e.media != "") {
                f = !0;
                var d = {};
                d = VMM.MediaType(e.media);

                if (d.type == "image") {
                    VMM.appendElement(j, "<img src='" + d.id + "'>");  
                } else if (d.type == "youtube") {
                    VMM.appendElement(j, "<iframe frameborder='0' src='http://www.youtube.com/embed/" + d.id + "?&rel=0&theme=light&showinfo=0&hd=1&autohide=0&color=white' allowfullscreen>");
                } else if (d.type == "vimeo") {
                    VMM.appendElement(j, "<iframe frameborder='0' src='http://player.vimeo.com/video/" + d.id + "?title=0&amp;byline=0&amp;portrait=0&amp;color=ffffff'>");
                } else if (d.type == "dailymotion") {
                    VMM.appendElement(j, "<iframe frameborder='0' src='http://www.dailymotion.com/embed/video/" + d.id + "'>");
                } else {
					
                }

                e.credit != null && e.credit != "" && VMM.appendElement(i, VMM.createElement("div", e.credit, "credit"));
                e.caption != null && e.caption != "" && VMM.appendElement(i, VMM.createElement("div", e.caption, "caption"))				
            }
        };
        this.setData = function(a) {
            if (typeof a != "undefined") {
                e = a;
                m()
            } else trace("NO DATA")
        }
    };
    VMM.Media.prototype.height = function(a) {
        if (a == null || a == "") return config.height;
        config.height = a;
        reSize()
    };
    VMM.Media.prototype.width = function(a) {
        if (a == null || a == "") return config.width;
        config.width = a;
        reSize()
    };
    VMM.Media.prototype.getData = function() {
        return data
    };
    VMM.Media.prototype.setConfig = function(a) {
        typeof a != "undefined" ? config = a: trace("NO CONFIG DATA")
    };
    VMM.Media.prototype.getConfig = function() {
        return config
    };
    VMM.Media.prototype.setSize = function(a, b) {
        a != null && (config.width = a);
        b != null && (config.height = b);
        _active && reSize()
    };
    VMM.Media.prototype.active = function() {
        return _active
    }
}
Date.prototype.getWeek = function() {
    var a = new Date(this.getFullYear(), 0, 1);
    return Math.ceil(((this - a) / 864e5 + a.getDay() + 1) / 7)
};
Date.prototype.getDayOfYear = function() {
    var a = new Date(this.getFullYear(), 0, 1);
    return Math.ceil((this - a) / 864e5)
};
var is = {
    Null: function(a) {
        return a === null
    },
    Undefined: function(a) {
        return a === undefined
    },
    nt: function(a) {
        return a === null || a === undefined
    },
    Function: function(a) {
        return typeof a == "function" ? a.constructor.toString().match(/Function/) !== null: !1
    },
    String: function(a) {
        return typeof a == "string" ? !0: typeof a == "object" ? a.constructor.toString().match(/string/i) !== null: !1
    },
    Array: function(a) {
        return typeof a == "object" ? a.constructor.toString().match(/array/i) !== null || a.length !== undefined: !1
    },
    Boolean: function(a) {
        return typeof a == "boolean" ? !0: typeof a == "object" ? a.constructor.toString().match(/boolean/i) !== null: !1
    },
    Date: function(a) {
        return typeof a == "date" ? !0: typeof a == "object" ? a.constructor.toString().match(/date/i) !== null: !1
    },
    HTML: function(a) {
        return typeof a == "object" ? a.constructor.toString().match(/html/i) !== null: !1
    },
    Number: function(a) {
        return typeof a == "number" ? !0: typeof a == "object" ? a.constructor.toString().match(/Number/) !== null: !1
    },
    Object: function(a) {
        return typeof a == "object" ? a.constructor.toString().match(/object/i) !== null: !1
    },
    RegExp: function(a) {
        return typeof a == "function" ? a.constructor.toString().match(/regexp/i) !== null: !1
    }
},
type = {
    of: function(a) {
        for (var b in is) if (is[b](a)) return b.toLowerCase()
    }
};
if (typeof jQuery != "undefined") {
    jQuery.easing.jswing = jQuery.easing.swing;
    jQuery.extend(jQuery.easing, {
        def: "easeOutQuad",
        swing: function(a, b, c, d, e) {
            return jQuery.easing[jQuery.easing.def](a, b, c, d, e)
        },
        easeInExpo: function(a, b, c, d, e) {
            return b == 0 ? c: d * Math.pow(2, 10 * (b / e - 1)) + c
        },
        easeOutExpo: function(a, b, c, d, e) {
            return b == e ? c + d: d * ( - Math.pow(2, -10 * b / e) + 1) + c
        },
        easeInOutExpo: function(a, b, c, d, e) {
            return b == 0 ? c: b == e ? c + d: (b /= e / 2) < 1 ? d / 2 * Math.pow(2, 10 * (b - 1)) + c: d / 2 * ( - Math.pow(2, -10 * --b) + 2) + c
        },
        easeInQuad: function(a, b, c, d, e) {
            return d * (b /= e) * b + c
        },
        easeOutQuad: function(a, b, c, d, e) {
            return - d * (b /= e) * (b - 2) + c
        },
        easeInOutQuad: function(a, b, c, d, e) {
            return (b /= e / 2) < 1 ? d / 2 * b * b + c: -d / 2 * (--b * (b - 2) - 1) + c
        }
    })
}
typeof VMM != "undefined" && typeof VMM.Slider == "undefined" && (VMM.Slider = function(a, b, c, d) {
    function y() {
        trace("onConfigSet")
    }
    function z(a, b) {
        var c = !0,
        d = !1;
        a != null && (c = a);
        b != null && (d = b);
        l = o.width;
        o.nav_height = VMM.Element.height(w.prevBtnContainer);
        o.content_width = l - o.content_padding * 2;
        VMM.Element.width(v, i.length * o.content_width);
        if (d) {
            var e = VMM.Element.position(i[k]);
            VMM.Element.css(u, "left", e.left)
        }
        H();
        VMM.Element.css(w.nextBtn, "left", l - o.nav_width);
        VMM.Element.height(w.prevBtn, o.height);
        VMM.Element.height(w.nextBtn, o.height);
        VMM.Element.css(w.nextBtnContainer, "top", o.height / 2 - o.nav_height / 2);
        VMM.Element.css(w.prevBtnContainer, "top", o.height / 2 - o.nav_height / 2);
        VMM.Element.height(t, o.height);
        VMM.Element.width(t, l);
        c && J(k, "linear", 1);
        k == 0 && VMM.Element.visible(w.prevBtn, !1)
    }
    function A(a) {
        if (k == i.length - 1) VMM.Element.animate(u, o.duration, o.ease, {
            left: -VMM.Element.position(i[k]).left
        });
        else {
            J(k + 1);
            E()
        }
    }
    function B(a) {
        if (k == 0) J(k);
        else {
            J(k - 1);
            E()
        }
    }
    function C(a) {
        switch (a.keyCode) {
            case 39:
                A(a);
                break;
            case 37:
                B(a)
        }
    }
    function D(a, b) {
        if (n.length == 0) for (var c = 0; c < i.length; c++) {
            var d = VMM.Element.position(i[c]);
            n.push(d.left)
        }
        if (typeof b.left == "number") {
            var e = b.left;
            e < -VMM.Element.position(i[k]).left - o.width / 3 ? A() : e > -VMM.Element.position(i[k]).left + o.width / 3 ? B() : VMM.Element.animate(u, o.duration, o.ease, {
                left: -VMM.Element.position(i[k]).left
            })
        } else VMM.Element.animate(u, o.duration, o.ease, {
            left: -VMM.Element.position(i[k]).left
        });
        typeof b.top == "number" && VMM.Element.animate(u, o.duration, o.ease, {
            top: -b.top
        })
    }
    function E() {
        VMM.fireEvent(x, "UPDATE")
    }
    var e = "private",
    f = {},
    g = [],
    h = "",
    i = [],
    j = [],
    k = 0,
    l = 960,
    m = {
        move: !1,
        x: 10,
        y: 0,
        off: 0,
        dampen: 48
    },
    n = [],
    o = {
        interval: 10,
        something: 0,
        width: 720,
        height: 400,
        content_width: 720,
        content_height: 400,
        content_padding: 130,
        ease: "easeInOutExpo",
        duration: 1e3,
        nav_width: 100,
        nav_height: 200,
        timeline: !1,
        spacing: 15
    },
    p = 1e3;
    b != null && b != "" && (o.width = b);
    c != null && c != "" && (o.height = c);
    d != null && d != "" && (o.timeline = d);
    var q = "",
    r = !1,
    s = "",
    t = "",
    u = "",
    v = "",
    w = {};
    w.nextBtn;
    w.prevBtn;
    w.nextDate;
    w.prevDate;
    w.nextTitle;
    w.prevTitle;
    this.ver = "0.1";
    var x = a;
    this.init = function(a) {
        typeof a != "undefined" ? this.setData(a) : trace("WAITING ON DATA")
    };
    this.width = function(a) {
        if (a == null || a == "") return o.width;
        o.width = a;
        z()
    };
    this.height = function(a) {
        if (a == null || a == "") return o.height;
        o.height = a;
        z()
    };
    this.setData = function(a) {
        if (typeof a != "undefined") {
            g = a;
            L()
        } else trace("NO DATA")
    };
    this.getData = function() {
        return g
    };
    this.setConfig = function(a) {
        typeof a != "undefined" ? o = a: trace("NO CONFIG DATA")
    };
    this.getConfig = function() {
        return o
    };
    this.setSize = function(a, b) {
        a != null && (o.width = a);
        b != null && (o.height = b);
        r && z()
    };
    this.active = function() {
        return r
    };
    this.getCurrentNumber = function() {
        return k
    };
    this.setSlide = function(a) {
        J(a)
    };
    var F = function(a) {
        g = a
    },
    G = function(a) {
        VMM.attachElement(v, "");
        for (var b = 0; b < a.length; b++) {
            var c = "",
            d,
            e;
            c = VMM.createElement("div", a[b].content, "content");
            d = VMM.appendAndGetElement(v, "<div>", "slider-item", c);
            i.push(d)
        }
    },
    H = function() {
        VMM.Element.css(".slider-item", "width", o.content_width);
        VMM.Element.height(".slider-item", o.height);
        VMM.Element.css(".slider-item .layout-text-media .media .media-container img", "max-height", o.height - 50);
        VMM.Element.css(".slider-item .layout-media .media .media-container img", "max-height", o.height - 150);
        VMM.Element.css(".slider-item .media .media-container .soundcloud", "max-height", 168);
        var a = Math.round(o.height) - 160,
        b = Math.round(a / 9 * 16),
        c = o.content_width / 100 * 60,
        d = Math.round(c / 16 * 9) + 25;
        VMM.Element.height(".slider-item .media .media-container .media-frame", d);
        VMM.Element.width(".slider-item .media .media-container .media-frame", c);
        VMM.Element.height(".slider-item .layout-media .media .media-container .media-frame", a);
        VMM.Element.width(".slider-item .layout-media .media .media-container .media-frame", b);
        VMM.Element.height(".slider-item .layout-media .media .media-container .soundcloud", o.height - 150);
        VMM.Element.width(".slider-item .layout-media .media .media-container .soundcloud", o.content_width);
        VMM.Element.width(".slider-item .layout-text-media .media .media-container .soundcloud", c);
        VMM.Element.height(".slider-item .media .media-container .map", a);
        VMM.Element.css(".slider-item .layout-text-media .media .media-container .media-frame", "max-width", o.content_width);
        var e = 0;
        for (var f = 0; f < i.length; f++) {
            e = f * (o.width + o.spacing);
            VMM.Element.css(i[f], "left", e)
        }
    },
    I = function(a) {
        var b = "linear";
        for (var c = 0; c < i.length; c++) c == k ? VMM.Element.animate(i[c], o.duration, b, {
            opacity: 1
        }) : c == k - 1 ? VMM.Element.animate(i[c], o.duration, b, {
            opacity: .1
        }) : c == k + 1 ? VMM.Element.animate(i[c], o.duration, b, {
            opacity: .1
        }) : VMM.Element.css(i[c], "opacity", a)
    },
    J = function(a, b, c, d, e) {
        VMM.ExternalAPI.youtube.stopPlayers();
        k = a;
        var f = o.ease,
        h = o.duration,
        j = !1,
        l = !1;
        k == 0 && (l = !0);
        k + 1 == i.length && (j = !0);
        b != null && b != "" && (f = b);
        c != null && c != "" && (h = c);
        var m = VMM.Element.position(i[k]);
        if (l) VMM.Element.visible(w.prevBtn, !1);
        else {
            VMM.Element.visible(w.prevBtn, !0);
            o.timeline && VMM.attachElement(w.prevDate, g[k - 1].date);
            VMM.attachElement(w.prevTitle, VMM.Util.unlinkify(g[k - 1].title))
        }
        if (j) VMM.Element.visible(w.nextBtn, !1);
        else {
            VMM.Element.visible(w.nextBtn, !0);
            o.timeline && VMM.attachElement(w.nextDate, g[k + 1].date);
            VMM.attachElement(w.nextTitle, VMM.Util.unlinkify(g[k + 1].title))
        }
        if (d) VMM.Element.css(u, "left", -(m.left - o.content_padding));
        else {
            VMM.Element.stop(u);
            VMM.Element.animate(u, h, f, {
                left: -(m.left - o.content_padding)
            })
        }
        e && VMM.fireEvent(x, "LOADED");
        if (VMM.Element.height(i[k]) > o.height) VMM.Element.css(".slider", "overflow-y", "scroll");
        else {
            VMM.Element.css(x, "overflow-y", "hidden");
            VMM.Element.animate(x, h, f, {
                scrollTop: VMM.Element.prop(x, "scrollHeight") - VMM.Element.height(x)
            })
        }
    },
    K = function() {
        var a = "<div class='icon'>&nbsp;</div>";
        w.nextBtn = VMM.appendAndGetElement(s, "<div>", "nav-next");
        w.prevBtn = VMM.appendAndGetElement(s, "<div>", "nav-previous");
        w.nextBtnContainer = VMM.appendAndGetElement(w.nextBtn, "<div>", "nav-container", a);
        w.prevBtnContainer = VMM.appendAndGetElement(w.prevBtn, "<div>", "nav-container", a);
        if (o.timeline) {
            w.nextDate = VMM.appendAndGetElement(w.nextBtnContainer, "<div>", "date", "1957");
            w.prevDate = VMM.appendAndGetElement(w.prevBtnContainer, "<div>", "date", "1957")
        }
        w.nextTitle = VMM.appendAndGetElement(w.nextBtnContainer, "<div>", "title", "Title Goes Here");
        w.prevTitle = VMM.appendAndGetElement(w.prevBtnContainer, "<div>", "title", "Title Goes Here");
        VMM.bindEvent(".nav-next", A);
        VMM.bindEvent(".nav-previous", B);
        VMM.bindEvent(window, C, "keydown")
    },
    L = function() {
        VMM.attachElement(x, "");
        s = VMM.getElement("div.slider");
        t = VMM.appendAndGetElement(s, "<div>", "slider-container-mask");
        u = VMM.appendAndGetElement(t, "<div>", "slider-container");
        v = VMM.appendAndGetElement(u, "<div>", "slider-item-container");
        K();
        G(g);
        var a = 3e3;
        if (VMM.Browser.device == "tablet" || VMM.Browser.device == "mobile") {
            o.duration = 500;
            a = 1e3;
            VMM.TouchSlider.createPanel(u, u, VMM.Element.width(i[0]), o.spacing, !0);
            VMM.bindEvent(u, D, "TOUCHUPDATE")
        } else VMM.Browser.device != "mobile";
        z(!1, !0);
        VMM.Element.visible(w.prevBtn, !1);
        J(0, "easeOutExpo", a, !0, !0);
        r = !0
    }
});
if (typeof VMM != "undefined" && typeof VMM.Util == "undefined") {
    VMM.Util = {
        init: function() {
            return this
        },
        randomBetween: function(a, b) {
            return Math.floor(Math.random() * (b - a + 1) + a)
        },
        customSort: function(a, b) {
            var c = a,
            d = b;
            return c == d ? 0: c > d ? 1: -1
        },
        number2money: function(a, b, c) {
            var b = b !== null ? b: !0,
            c = c !== null ? c: !1,
            d = VMM.Math2.floatPrecision(a, 2),
            e = this.niceNumber(d);
            ! e.split(/\./g)[1] && c && (e += ".00");
            b && (e = "$" + e);
            return e
        },
        wordCount: function(a) {
            var b = a + " ",
            c = /^[^A-Za-z0-9\'\-]+/gi,
            d = b.replace(c, ""),
            e = /[^A-Za-z0-9\'\-]+/gi,
            f = d.replace(e, " "),
            g = f.split(" "),
            h = g.length - 1;
            b.length < 2 && (h = 0);
            return h
        },
        parseDate: function(a) {
            var b;
            if (a.match(/,/gi)) {
                var c = a.split(",");
                for (var d = 0; d < c.length; d++) c[d] = parseInt(c[d]);
                b = new Date;
                c[0] && b.setFullYear(c[0]);
                c[1] > 1 ? b.setMonth(c[1] - 1) : b.setMonth(0);
                c[2] > 0 ? b.setDate(c[2]) : b.setDate(1);
                c[3] > 1 ? b.setHours(c[3]) : b.setHours(0);
                c[4] > 1 ? b.setMinutes(c[4]) : b.setMinutes(0);
                c[5] > 1 ? b.setSeconds(c[5]) : b.setSeconds(0);
                c[6] > 1 ? b.setMilliseconds(c[6]) : b.setMilliseconds(0)
            } else if (a.match("/")) b = new Date(a);
            else if (a.length < 5) {
                b = new Date;
                b.setFullYear(parseInt(a));
                b.setMonth(0);
                b.setDate(1);
                b.setHours(0);
                b.setMinutes(0);
                b.setSeconds(0);
                b.setMilliseconds(0)
            } else b = new Date(parseInt(a.slice(0, 4)), parseInt(a.slice(4, 6)) - 1, parseInt(a.slice(6, 8)), parseInt(a.slice(8, 10)), parseInt(a.slice(10, 12)));
            return b
        },
        ratio: {
            r16_9: function(a, b) {
                if (a !== null && a !== "") return Math.round(b / 16 * 9);
                if (b !== null && b !== "") return Math.round(a / 9 * 16)
            },
            r4_3: function(a, b) {
                if (a !== null && a !== "") return Math.round(b / 4 * 3);
                if (b !== null && b !== "") return Math.round(a / 3 * 4)
            }
        },
        date: {
            month: VMM.master_config.i18n.date.month,
            month_abbr: VMM.master_config.i18n.date.month_abbr,
            day: VMM.master_config.i18n.date.day,
            day_abbr: VMM.master_config.i18n.date.day_abbr,
            hour: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            hour_suffix: ["am"],
            prettyDate: function(a, b, c) {
                var d = "";
                if (type.of(a) == "date") {
                    dateFormat.i18n = {
                        dayNames: VMM.master_config.i18n.date.day_abbr.concat(VMM.master_config.i18n.date.day),
                        monthNames: VMM.master_config.i18n.date.month_abbr.concat(VMM.master_config.i18n.date.month)
                    };
                    a.getMonth() === 0 && a.getDate() == 1 && a.getHours() === 0 && a.getMinutes() === 0 ? d = dateFormat(a, VMM.master_config.i18n.dateformats.year) : a.getDate() < 1 && a.getHours() === 0 && a.getMinutes() === 0 ? b ? d = dateFormat(a, VMM.master_config.i18n.dateformats.month_short) : d = dateFormat(a, VMM.master_config.i18n.dateformats.month) : a.getHours() === 0 && a.getMinutes() === 0 ? b ? d = dateFormat(a, VMM.master_config.i18n.dateformats.full_short) : d = dateFormat(a, VMM.master_config.i18n.dateformats.full) : a.getMinutes() === 0 ? b ? d = dateFormat(a, VMM.master_config.i18n.dateformats.time_no_seconds_short) : d = dateFormat(a, VMM.master_config.i18n.dateformats.time_no_seconds_small_date) : b ? d = dateFormat(a, VMM.master_config.i18n.dateformats.full_long) : d = dateFormat(a, VMM.master_config.i18n.dateformats.full_long)
                } else {
                    trace("NOT A VALID DATE?");
                    trace(a)
                }
                return d
            }
        },
        doubledigit: function(a) {
            return (a < 10 ? "0": "") + a
        },
        truncateWords: function(a, b, c) {
            b || (b = 30);
            c || (c = b);
            var d = /^[^A-Za-z0-9\'\-]+/gi,
            e = a.replace(d, ""),
            f = e.split(" "),
            g = [];
            b = Math.min(f.length, b);
            c = Math.min(f.length, c);
            for (var h = 0; h < b; h++) g.push(f[h]);
            for (var i = b; h < c; h++) {
                var j = f[h];
                g.push(j);
                if (j.charAt(j.length - 1) == ".") break
            }
            return g.join(" ")
        },
        linkify: function(a, b, c) {
            var d = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim,
            e = /(^|[^\/])(www\.[\S]+(\b|$))/gim,
            f = /(([a-zA-Z0-9_\-\.]+)@[a-zA-Z_]+?(?:\.[a-zA-Z]{2,6}))+/gim;
            return a.replace(d, "<a target='_blank' href='$&' onclick='void(0)'>$&</a>").replace(e, "$1<a target='_blank' onclick='void(0)' href='http://$2'>$2</a>").replace(f, "<a target='_blank' onclick='void(0)' href='mailto:$1'>$1</a>")
        },
        linkify_with_twitter: function(a, b, c) {
            var d = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim,
            e = /(\()((?:ht|f)tps?:\/\/[a-z0-9\-._~!$&'()*+,;=:\/?#[\]@%]+)(\))|(\[)((?:ht|f)tps?:\/\/[a-z0-9\-._~!$&'()*+,;=:\/?#[\]@%]+)(\])|(\{)((?:ht|f)tps?:\/\/[a-z0-9\-._~!$&'()*+,;=:\/?#[\]@%]+)(\})|(<|&(?:lt|#60|#x3c);)((?:ht|f)tps?:\/\/[a-z0-9\-._~!$&'()*+,;=:\/?#[\]@%]+)(>|&(?:gt|#62|#x3e);)|((?:^|[^=\s'"\]])\s*['"]?|[^=\s]\s+)(\b(?:ht|f)tps?:\/\/[a-z0-9\-._~!$'()*+,;=:\/?#[\]@%]+(?:(?!&(?:gt|#0*62|#x0*3e);|&(?:amp|apos|quot|#0*3[49]|#x0*2[27]);[.!&',:?;]?(?:[^a-z0-9\-._~!$&'()*+,;=:\/?#[\]@%]|$))&[a-z0-9\-._~!$'()*+,;=:\/?#[\]@%]*)*[a-z0-9\-_~$()*+=\/#[\]@%])/img,
            f = '$1$4$7$10$13<a href="$2$5$8$11$14">$2$5$8$11$14</a>$3$6$9$12',
            g = /(^|[^\/])(www\.[\S]+(\b|$))/gim,
            h = /(([a-zA-Z0-9_\-\.]+)@[a-zA-Z_]+?(?:\.[a-zA-Z]{2,6}))+/gim,
            i = /(@([\w]+))/g,
            j = /(#([\w]+))/g;
            return a.replace(e, f).replace(g, "$1<a target='_blank' onclick='void(0)' href='http://$2'>$2</a>").replace(h, "<a target='_blank' onclick='void(0)' href='mailto:$1'>$1</a>").replace(i, "<a href='http://twitter.com/$2' target='_blank' onclick='void(0)'>$1</a>").replace(j, "<a href='http://twitter.com/#search?q=%23$2' target='_blank' 'void(0)'>$1</a>")
        },
        unlinkify: function(a) {
            if (!a) return a;
            a = a.replace(/<a\b[^>]*>/i, "");
            a = a.replace(/<\/a>/i, "");
            return a
        },
        nl2br: function(a) {
            return a.replace(/(\r\n|[\r\n]|\\n|\\r)/g, "<br/>")
        },
        unique_ID: function(a) {
            var b = function(a) {
                return Math.floor(Math.random() * a)
            },
            c = function() {
                var a = "abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ";
                return a.substr(b(62), 1)
            },
            d = function(a) {
                var b = "";
                for (var d = 0; d < a; d++) b += c();
                return b
            };
            return d(a)
        },
        isEven: function(a) {
            return a % 2 === 0 ? !0: !1
        },
        getUrlVars: function(a) {
            var b = a.toString(),
            c = [],
            d,
            e = b.slice(b.indexOf("?") + 1).split("&");
            for (var f = 0; f < e.length; f++) {
                d = e[f].split("=");
                c.push(d[0]);
                c[d[0]] = d[1]
            }
            return c
        },
        toHTML: function(a) {
            a = this.nl2br(a);
            a = this.linkify(a);
            return a.replace(/\s\s/g, "&nbsp;&nbsp;")
        },
        toCamelCase: function(a, b) {
            b !== !1 && (b = !0);
            var c = (b ? a.toLowerCase() : a).split(" ");
            for (var d = 0; d < c.length; d++) c[d] = c[d].substr(0, 1).toUpperCase() + c[d].substr(1);
            return c.join(" ")
        },
        properQuotes: function(a) {
            return a.replace(/\"([^\"]*)\"/gi, "&#8220;$1&#8221;")
        },
        niceNumber: function(a) {
            var b = String(Math.abs(Number(a))),
            c = b.split(/\./g)[0],
            d = b.split(/\./g)[1],
            e = "",
            f = c.toArray();
            f.reverse();
            for (var g = 1; g <= f.length; g++) g % 3 == 0 && g < f.length ? e = "," + f[g - 1] + e: e = f[g - 1] + e;
            return d != null && d != "" && d != undefined ? e + "." + d: e
        },
        toTitleCase: function(a) {
            var b = {
                __smallWords: ["a", "an", "and", "as", "at", "but", "by", "en", "for", "if", "in", "of", "on", "or", "the", "to", "v[.]?", "via", "vs[.]?"],
                init: function() {
                    this.__smallRE = this.__smallWords.join("|");
                    this.__lowerCaseWordsRE = new RegExp("\\b(" + this.__smallRE + ")\\b", "gi");
                    this.__firstWordRE = new RegExp("^([^a-zA-Z0-9 \\r\\n\\t]*)(" + this.__smallRE + ")\\b", "gi");
                    this.__lastWordRE = new RegExp("\\b(" + this.__smallRE + ")([^a-zA-Z0-9 \\r\\n\\t]*)$", "gi")
                },
                toTitleCase: function(a) {
                    var b = "",
                    c = a.split(/([:.;?!][ ]|(?:[ ]|^)["“])/);
                    for (var d = 0; d < c.length; ++d) {
                        var e = c[d];
                        e = e.replace(/\b([a-zA-Z][a-z.'’]*)\b/g, this.__titleCaseDottedWordReplacer);
                        e = e.replace(this.__lowerCaseWordsRE, this.__lowerReplacer);
                        e = e.replace(this.__firstWordRE, this.__firstToUpperCase);
                        e = e.replace(this.__lastWordRE, this.__firstToUpperCase);
                        b += e
                    }
                    b = b.replace(/ V(s?)\. /g, " v$1. ");
                    b = b.replace(/(['’])S\b/g, "$1s");
                    b = b.replace(/\b(AT&T|Q&A)\b/ig, this.__upperReplacer);
                    return b
                },
                __titleCaseDottedWordReplacer: function(a) {
                    return a.match(/[a-zA-Z][.][a-zA-Z]/) ? a: b.__firstToUpperCase(a)
                },
                __lowerReplacer: function(a) {
                    return a.toLowerCase()
                },
                __upperReplacer: function(a) {
                    return a.toUpperCase()
                },
                __firstToUpperCase: function(a) {
                    var b = a.split(/(^[^a-zA-Z0-9]*[a-zA-Z0-9])(.*)$/);
                    b[1] = b[1].toUpperCase();
                    return b.join("")
                }
            };
            b.init();
            a = a.replace(/_/g, " ");
            a = b.toTitleCase(a);
            return a
        }
    }.init();
    String.linkify || (String.prototype.linkify = function() {
        var a = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim,
        b = /(^|[^\/])(www\.[\S]+(\b|$))/gim,
        c = /(([a-zA-Z0-9_\-\.]+)@[a-zA-Z_]+?(?:\.[a-zA-Z]{2,6}))+/gim,
        d = /(@([\w]+))/g,
        e = /(#([\w]+))/g;
        return this.replace(a, '<a target="_blank" href="$&">$&</a>').replace(b, '$1<a target="_blank" href="http://$2">$2</a>').replace(c, '<a target="_blank" href="mailto:$1">$1</a>').replace(d, "<a href='http://twitter.com/$2' target='_blank'>$1</a>").replace(e, "<a href='http://twitter.com/#search?q=%23$2' target='_blank'>$1</a>")
    })
}
window.loadedJS = [];
typeof VMM != "undefined" && typeof VMM.LoadLib == "undefined" && (VMM.LoadLib = function(a) {
    function i(a) {
        var b = !1;
        for (var c = 0; c < h.length; c++) h[c] == a && (b = !0);
        b || h.push(a);
        return b
    }
    function j(b, c) {
        var d = a.createElement(b),
        e;
        for (e in c) c.hasOwnProperty(e) && d.setAttribute(e, c[e]);
        return d
    }
    function k(a) {
        var b = d[a],
        c,
        g;
        if (b) {
            c = b.callback;
            g = b.urls;
            g.shift();
            e = 0;
            if (!g.length) {
                c && c.call(b.context, b.obj);
                d[a] = null;
                f[a].length && m(a)
            }
        }
    }
    function l() {
        var c = navigator.userAgent;
        b = {
            async: a.createElement("script").async === !0
        };
        (b.webkit = /AppleWebKit\//.test(c)) || (b.ie = /MSIE/.test(c)) || (b.opera = /Opera/.test(c)) || (b.gecko = /Gecko\//.test(c)) || (b.unknown = !0)
    }
    function m(e, g, h, i, m) {
        var p = function() {
            k(e)
        },
        q = e === "css",
        r = [],
        s,
        t,
        u,
        v,
        w,
        x;
        b || l();
        if (g) {
            g = typeof g == "string" ? [g] : g.concat();
            if (q || b.async || b.gecko || b.opera) f[e].push({
                urls: g,
                callback: h,
                obj: i,
                context: m
            });
            else for (s = 0, t = g.length; s < t; ++s) f[e].push({
                urls: [g[s]],
                callback: s === t - 1 ? h: null,
                obj: i,
                context: m
            })
        }
        if (d[e] || !(v = d[e] = f[e].shift())) return;
        c || (c = a.head || a.getElementsByTagName("head")[0]);
        w = v.urls;
        for (s = 0, t = w.length; s < t; ++s) {
            x = w[s];
            if (q) u = b.gecko ? j("style") : j("link", {
                href: x,
                rel: "stylesheet"
            });
            else {
                u = j("script", {
                    src: x
                });
                u.async = !1
            }
            u.className = "lazyload";
            u.setAttribute("charset", "utf-8");
            if (b.ie && !q) u.onreadystatechange = function() {
                if (/loaded|complete/.test(u.readyState)) {
                    u.onreadystatechange = null;
                    p()
                }
            };
            else if (q && (b.gecko || b.webkit)) if (b.webkit) {
                v.urls[s] = u.href;
                o()
            } else {
                u.innerHTML = '@import "' + x + '";';
                n(u)
            } else u.onload = u.onerror = p;
            r.push(u)
        }
        for (s = 0, t = r.length; s < t; ++s) c.appendChild(r[s])
    }
    function n(a) {
        var b;
        try {
            b = !!a.sheet.cssRules
        } catch(c) {
            e += 1;
            e < 200 ? setTimeout(function() {
                n(a)
            },
            50) : b && k("css");
            return
        }
        k("css")
    }
    function o() {
        var a = d.css,
        b;
        if (a) {
            b = g.length;
            while (--b >= 0) if (g[b].href === a.urls[0]) {
                k("css");
                break
            }
            e += 1;
            a && (e < 200 ? setTimeout(o, 50) : k("css"))
        }
    }
    var b,
    c,
    d = {},
    e = 0,
    f = {
        css: [],
        js: []
    },
    g = a.styleSheets,
    h = [];
    return {
        css: function(a, b, c, d) {
            if (i(a)) return b;
            m("css", a, b, c, d)
        },
        js: function(a, b, c, d) {
            if (i(a)) return b;
            m("js", a, b, c, d)
        }
    }
} (this.document));
!
function(a) {
    "use strict";
    var b = function(a, b) {
        this.init("tooltip", a, b)
    };
    b.prototype = {
        constructor: b,
        init: function(b, c, d) {
            var e,
            f;
            this.type = b;
            this.$element = a(c);
            this.options = this.getOptions(d);
            this.enabled = !0;
            if (this.options.trigger != "manual") {
                e = this.options.trigger == "hover" ? "mouseenter": "focus";
                f = this.options.trigger == "hover" ? "mouseleave": "blur";
                this.$element.on(e, this.options.selector, a.proxy(this.enter, this));
                this.$element.on(f, this.options.selector, a.proxy(this.leave, this))
            }
            this.options.selector ? this._options = a.extend({},
                this.options, {
                    trigger: "manual",
                    selector: ""
                }) : this.fixTitle()
        },
        getOptions: function(b) {
            b = a.extend({},
                a.fn[this.type].defaults, b, this.$element.data());
            b.delay && typeof b.delay == "number" && (b.delay = {
                show: b.delay,
                hide: b.delay
            });
            return b
        },
        enter: function(b) {
            var c = a(b.currentTarget)[this.type](this._options).data(this.type);
            if (!c.options.delay || !c.options.delay.show) c.show();
            else {
                c.hoverState = "in";
                setTimeout(function() {
                    c.hoverState == "in" && c.show()
                },
                c.options.delay.show)
            }
        },
        leave: function(b) {
            var c = a(b.currentTarget)[this.type](this._options).data(this.type);
            if (!c.options.delay || !c.options.delay.hide) c.hide();
            else {
                c.hoverState = "out";
                setTimeout(function() {
                    c.hoverState == "out" && c.hide()
                },
                c.options.delay.hide)
            }
        },
        show: function() {
            var a,
            b,
            c,
            d,
            e,
            f,
            g;
            if (this.hasContent() && this.enabled) {
                a = this.tip();
                this.setContent();
                this.options.animation && a.addClass("fade");
                f = typeof this.options.placement == "function" ? this.options.placement.call(this, a[0], this.$element[0]) : this.options.placement;
                b = /in/.test(f);
                a.remove().css({
                    top: 0,
                    left: 0,
                    display: "block"
                }).appendTo(b ? this.$element: document.body);
                c = this.getPosition(b);
                d = a[0].offsetWidth;
                e = a[0].offsetHeight;
                switch (b ? f.split(" ")[1] : f) {
                    case "bottom":
                        g = {
                            top: c.top + c.height,
                            left: c.left + c.width / 2 - d / 2
                        };
                        break;
                    case "top":
                        g = {
                            top: c.top - e,
                            left: c.left + c.width / 2 - d / 2
                        };
                        break;
                    case "left":
                        g = {
                            top: c.top + c.height / 2 - e / 2,
                            left: c.left - d
                        };
                        break;
                    case "right":
                        g = {
                            top: c.top + c.height / 2 - e / 2,
                            left: c.left + c.width
                        }
                }
                a.css(g).addClass(f).addClass("in")
            }
        },
        setContent: function() {
            var a = this.tip();
            a.find(".tooltip-inner").html(this.getTitle());
            a.removeClass("fade in top bottom left right")
        },
        hide: function() {
            function d() {
                var b = setTimeout(function() {
                    c.off(a.support.transition.end).remove()
                },
                500);
                c.one(a.support.transition.end,
                    function() {
                        clearTimeout(b);
                        c.remove()
                    })
            }
            var b = this,
            c = this.tip();
            c.removeClass("in");
            a.support.transition && this.$tip.hasClass("fade") ? d() : c.remove()
        },
        fixTitle: function() {
            var a = this.$element;
            (a.attr("title") || typeof a.attr("data-original-title") != "string") && a.attr("data-original-title", a.attr("title") || "").removeAttr("title")
        },
        hasContent: function() {
            return this.getTitle()
        },
        getPosition: function(b) {
            return a.extend({},
                b ? {
                    top: 0,
                    left: 0
                }: this.$element.offset(), {
                    width: this.$element[0].offsetWidth,
                    height: this.$element[0].offsetHeight
                })
        },
        getTitle: function() {
            var a,
            b = this.$element,
            c = this.options;
            a = b.attr("data-original-title") || (typeof c.title == "function" ? c.title.call(b[0]) : c.title);
            a = a.toString().replace(/(^\s*|\s*$)/, "");
            return a
        },
        tip: function() {
            return this.$tip = this.$tip || a(this.options.template)
        },
        validate: function() {
            if (!this.$element[0].parentNode) {
                this.hide();
                this.$element = null;
                this.options = null
            }
        },
        enable: function() {
            this.enabled = !0
        },
        disable: function() {
            this.enabled = !1
        },
        toggleEnabled: function() {
            this.enabled = !this.enabled
        },
        toggle: function() {
            this[this.tip().hasClass("in") ? "hide": "show"]()
        }
    };
    a.fn.tooltip = function(c) {
        return this.each(function() {
            var d = a(this),
            e = d.data("tooltip"),
            f = typeof c == "object" && c;
            e || d.data("tooltip", e = new b(this, f));
            typeof c == "string" && e[c]()
        })
    };
    a.fn.tooltip.Constructor = b;
    a.fn.tooltip.defaults = {
        animation: !0,
        delay: 0,
        selector: !1,
        placement: "top",
        trigger: "hover",
        title: "",
        template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
    }
} (window.jQuery);
var Aes = {};
Aes.cipher = function(a, b) {
    var c = 4,
    d = b.length / c - 1,
    e = [[], [], [], []];
    for (var f = 0; f < 4 * c; f++) e[f % 4][Math.floor(f / 4)] = a[f];
    e = Aes.addRoundKey(e, b, 0, c);
    for (var g = 1; g < d; g++) {
        e = Aes.subBytes(e, c);
        e = Aes.shiftRows(e, c);
        e = Aes.mixColumns(e, c);
        e = Aes.addRoundKey(e, b, g, c)
    }
    e = Aes.subBytes(e, c);
    e = Aes.shiftRows(e, c);
    e = Aes.addRoundKey(e, b, d, c);
    var h = new Array(4 * c);
    for (var f = 0; f < 4 * c; f++) h[f] = e[f % 4][Math.floor(f / 4)];
    return h
};
Aes.keyExpansion = function(a) {
    var b = 4,
    c = a.length / 4,
    d = c + 6,
    e = new Array(b * (d + 1)),
    f = new Array(4);
    for (var g = 0; g < c; g++) {
        var h = [a[4 * g], a[4 * g + 1], a[4 * g + 2], a[4 * g + 3]];
        e[g] = h
    }
    for (var g = c; g < b * (d + 1); g++) {
        e[g] = new Array(4);
        for (var i = 0; i < 4; i++) f[i] = e[g - 1][i];
        if (g % c == 0) {
            f = Aes.subWord(Aes.rotWord(f));
            for (var i = 0; i < 4; i++) f[i] ^= Aes.rCon[g / c][i]
        } else c > 6 && g % c == 4 && (f = Aes.subWord(f));
        for (var i = 0; i < 4; i++) e[g][i] = e[g - c][i] ^ f[i]
    }
    return e
};
Aes.subBytes = function(a, b) {
    for (var c = 0; c < 4; c++) for (var d = 0; d < b; d++) a[c][d] = Aes.sBox[a[c][d]];
    return a
};
Aes.shiftRows = function(a, b) {
    var c = new Array(4);
    for (var d = 1; d < 4; d++) {
        for (var e = 0; e < 4; e++) c[e] = a[d][(e + d) % b];
        for (var e = 0; e < 4; e++) a[d][e] = c[e]
    }
    return a
};
Aes.mixColumns = function(a, b) {
    for (var c = 0; c < 4; c++) {
        var d = new Array(4),
        e = new Array(4);
        for (var f = 0; f < 4; f++) {
            d[f] = a[f][c];
            e[f] = a[f][c] & 128 ? a[f][c] << 1 ^ 283: a[f][c] << 1
        }
        a[0][c] = e[0] ^ d[1] ^ e[1] ^ d[2] ^ d[3];
        a[1][c] = d[0] ^ e[1] ^ d[2] ^ e[2] ^ d[3];
        a[2][c] = d[0] ^ d[1] ^ e[2] ^ d[3] ^ e[3];
        a[3][c] = d[0] ^ e[0] ^ d[1] ^ d[2] ^ e[3]
    }
    return a
};
Aes.addRoundKey = function(a, b, c, d) {
    for (var e = 0; e < 4; e++) for (var f = 0; f < d; f++) a[e][f] ^= b[c * 4 + f][e];
    return a
};
Aes.subWord = function(a) {
    for (var b = 0; b < 4; b++) a[b] = Aes.sBox[a[b]];
    return a
};
Aes.rotWord = function(a) {
    var b = a[0];
    for (var c = 0; c < 3; c++) a[c] = a[c + 1];
    a[3] = b;
    return a
};
Aes.sBox = [99, 124, 119, 123, 242, 107, 111, 197, 48, 1, 103, 43, 254, 215, 171, 118, 202, 130, 201, 125, 250, 89, 71, 240, 173, 212, 162, 175, 156, 164, 114, 192, 183, 253, 147, 38, 54, 63, 247, 204, 52, 165, 229, 241, 113, 216, 49, 21, 4, 199, 35, 195, 24, 150, 5, 154, 7, 18, 128, 226, 235, 39, 178, 117, 9, 131, 44, 26, 27, 110, 90, 160, 82, 59, 214, 179, 41, 227, 47, 132, 83, 209, 0, 237, 32, 252, 177, 91, 106, 203, 190, 57, 74, 76, 88, 207, 208, 239, 170, 251, 67, 77, 51, 133, 69, 249, 2, 127, 80, 60, 159, 168, 81, 163, 64, 143, 146, 157, 56, 245, 188, 182, 218, 33, 16, 255, 243, 210, 205, 12, 19, 236, 95, 151, 68, 23, 196, 167, 126, 61, 100, 93, 25, 115, 96, 129, 79, 220, 34, 42, 144, 136, 70, 238, 184, 20, 222, 94, 11, 219, 224, 50, 58, 10, 73, 6, 36, 92, 194, 211, 172, 98, 145, 149, 228, 121, 231, 200, 55, 109, 141, 213, 78, 169, 108, 86, 244, 234, 101, 122, 174, 8, 186, 120, 37, 46, 28, 166, 180, 198, 232, 221, 116, 31, 75, 189, 139, 138, 112, 62, 181, 102, 72, 3, 246, 14, 97, 53, 87, 185, 134, 193, 29, 158, 225, 248, 152, 17, 105, 217, 142, 148, 155, 30, 135, 233, 206, 85, 40, 223, 140, 161, 137, 13, 191, 230, 66, 104, 65, 153, 45, 15, 176, 84, 187, 22];
Aes.rCon = [[0, 0, 0, 0], [1, 0, 0, 0], [2, 0, 0, 0], [4, 0, 0, 0], [8, 0, 0, 0], [16, 0, 0, 0], [32, 0, 0, 0], [64, 0, 0, 0], [128, 0, 0, 0], [27, 0, 0, 0], [54, 0, 0, 0]];
Aes.Ctr = {};
Aes.Ctr.encrypt = function(a, b, c) {
    var d = 16;
    if (c != 128 && c != 192 && c != 256) return "";
    a = Utf8.encode(a);
    b = Utf8.encode(b);
    var e = c / 8,
    f = new Array(e);
    for (var g = 0; g < e; g++) f[g] = isNaN(b.charCodeAt(g)) ? 0: b.charCodeAt(g);
    var h = Aes.cipher(f, Aes.keyExpansion(f));
    h = h.concat(h.slice(0, e - 16));
    var i = new Array(d),
    j = (new Date).getTime(),
    k = j % 1e3,
    l = Math.floor(j / 1e3),
    m = Math.floor(Math.random() * 65535);
    for (var g = 0; g < 2; g++) i[g] = k >>> g * 8 & 255;
    for (var g = 0; g < 2; g++) i[g + 2] = m >>> g * 8 & 255;
    for (var g = 0; g < 4; g++) i[g + 4] = l >>> g * 8 & 255;
    var n = "";
    for (var g = 0; g < 8; g++) n += String.fromCharCode(i[g]);
    var o = Aes.keyExpansion(h),
    p = Math.ceil(a.length / d),
    q = new Array(p);
    for (var r = 0; r < p; r++) {
        for (var s = 0; s < 4; s++) i[15 - s] = r >>> s * 8 & 255;
        for (var s = 0; s < 4; s++) i[15 - s - 4] = r / 4294967296 >>> s * 8;
        var t = Aes.cipher(i, o),
        u = r < p - 1 ? d: (a.length - 1) % d + 1,
        v = new Array(u);
        for (var g = 0; g < u; g++) {
            v[g] = t[g] ^ a.charCodeAt(r * d + g);
            v[g] = String.fromCharCode(v[g])
        }
        q[r] = v.join("")
    }
    var w = n + q.join("");
    w = Base64.encode(w);
    return w
};
Aes.Ctr.decrypt = function(a, b, c) {
    var d = 16;
    if (c != 128 && c != 192 && c != 256) return "";
    a = Base64.decode(a);
    b = Utf8.encode(b);
    var e = c / 8,
    f = new Array(e);
    for (var g = 0; g < e; g++) f[g] = isNaN(b.charCodeAt(g)) ? 0: b.charCodeAt(g);
    var h = Aes.cipher(f, Aes.keyExpansion(f));
    h = h.concat(h.slice(0, e - 16));
    var i = new Array(8);
    ctrTxt = a.slice(0, 8);
    for (var g = 0; g < 8; g++) i[g] = ctrTxt.charCodeAt(g);
    var j = Aes.keyExpansion(h),
    k = Math.ceil((a.length - 8) / d),
    l = new Array(k);
    for (var m = 0; m < k; m++) l[m] = a.slice(8 + m * d, 8 + m * d + d);
    a = l;
    var n = new Array(a.length);
    for (var m = 0; m < k; m++) {
        for (var o = 0; o < 4; o++) i[15 - o] = m >>> o * 8 & 255;
        for (var o = 0; o < 4; o++) i[15 - o - 4] = (m + 1) / 4294967296 - 1 >>> o * 8 & 255;
        var p = Aes.cipher(i, j),
        q = new Array(a[m].length);
        for (var g = 0; g < a[m].length; g++) {
            q[g] = p[g] ^ a[m].charCodeAt(g);
            q[g] = String.fromCharCode(q[g])
        }
        n[m] = q.join("")
    }
    var r = n.join("");
    r = Utf8.decode(r);
    return r
};
var Base64 = {};
Base64.code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
Base64.encode = function(a, b) {
    b = typeof b == "undefined" ? !1: b;
    var c,
    d,
    e,
    f,
    g,
    h,
    i,
    j,
    k = [],
    l = "",
    m,
    n,
    o,
    p = Base64.code;
    n = b ? a.encodeUTF8() : a;
    m = n.length % 3;
    if (m > 0) while (m++<3) {
        l += "=";
        n += "\0"
    }
    for (m = 0; m < n.length; m += 3) {
        c = n.charCodeAt(m);
        d = n.charCodeAt(m + 1);
        e = n.charCodeAt(m + 2);
        f = c << 16 | d << 8 | e;
        g = f >> 18 & 63;
        h = f >> 12 & 63;
        i = f >> 6 & 63;
        j = f & 63;
        k[m / 3] = p.charAt(g) + p.charAt(h) + p.charAt(i) + p.charAt(j)
    }
    o = k.join("");
    o = o.slice(0, o.length - l.length) + l;
    return o
};
Base64.decode = function(a, b) {
    b = typeof b == "undefined" ? !1: b;
    var c,
    d,
    e,
    f,
    g,
    h,
    i,
    j,
    k = [],
    l,
    m,
    n = Base64.code;
    m = b ? a.decodeUTF8() : a;
    for (var o = 0; o < m.length; o += 4) {
        f = n.indexOf(m.charAt(o));
        g = n.indexOf(m.charAt(o + 1));
        h = n.indexOf(m.charAt(o + 2));
        i = n.indexOf(m.charAt(o + 3));
        j = f << 18 | g << 12 | h << 6 | i;
        c = j >>> 16 & 255;
        d = j >>> 8 & 255;
        e = j & 255;
        k[o / 4] = String.fromCharCode(c, d, e);
        i == 64 && (k[o / 4] = String.fromCharCode(c, d));
        h == 64 && (k[o / 4] = String.fromCharCode(c))
    }
    l = k.join("");
    return b ? l.decodeUTF8() : l
};
var Utf8 = {};
Utf8.encode = function(a) {
    var b = a.replace(/[\u0080-\u07ff]/g,
        function(a) {
            var b = a.charCodeAt(0);
            return String.fromCharCode(192 | b >> 6, 128 | b & 63)
        });
    b = b.replace(/[\u0800-\uffff]/g,
        function(a) {
            var b = a.charCodeAt(0);
            return String.fromCharCode(224 | b >> 12, 128 | b >> 6 & 63, 128 | b & 63)
        });
    return b
};
Utf8.decode = function(a) {
    var b = a.replace(/[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g,
        function(a) {
            var b = (a.charCodeAt(0) & 15) << 12 | (a.charCodeAt(1) & 63) << 6 | a.charCodeAt(2) & 63;
            return String.fromCharCode(b)
        });
    b = b.replace(/[\u00c0-\u00df][\u0080-\u00bf]/g,
        function(a) {
            var b = (a.charCodeAt(0) & 31) << 6 | a.charCodeAt(1) & 63;
            return String.fromCharCode(b)
        });
    return b
};
if (typeof VMM != "undefined" && typeof VMM.Timeline == "undefined") {
    VMM.Timeline = function(a, b, c) {
        function r(a, b) {
            m = b.timeline;
            type.of(m.era) != "array" && (m.era = []);
            H()
        }
        function s() {
            D()
        }
        function t() {
            F();
            i.setSize(o.feature_width, o.feature_height);
            j.setSize(o.width, o.height);
            G()
        }
        function u(a) {
            o.loaded.slider = !0;
            v()
        }
        function v(a
            ) {
            o.loaded.percentloaded = o.loaded.percentloaded + 25;
            A(VMM.master_config.i18n.messages.loading_timeline + o.loaded.percentloaded);
            o.loaded.slider && o.loaded.timenav && B()
        }
        function w(a) {
            o.loaded.timenav = !0;
            v()
        }
        function x(a) {
            j.setMarker(i.getCurrentNumber(), o.ease, o.duration)
        }
        function y(a) {
            i.setSlide(j.getCurrentNumber())
        }
        var d = "0.89";
        trace("OPEN TIMELINE VERSION " + d);
        var e = VMM.getElement("#timeline"),
        f,
        g,
        h = VMM.getElement("#timeline");
        f = VMM.appendAndGetElement(e, "<div>", "feedback", "");
        g = VMM.appendAndGetElement(f, "<div>", "messege", VMM.master_config.i18n.messages.loading_timeline);
        var i = new VMM.Slider("div.slider", 720, 400, !0),
        j = new VMM.Timeline.TimeNav("div.navigation", 720, 400, !0),
        k = "private",
        l = {},
        m = {},
        n = [],
        o = VMM.Timeline.Config;
        VMM.master_config.Timeline = VMM.Timeline.Config;
        o.maptype = "toner";
        o.interval = 10;
        o.something = 0;
        o.width = 960;
        o.height = 540;
        o.spacing = 15;
        o.loaded = {
            slider: !1,
            timenav: !1,
            percentloaded: 0
        };
        o.ease = "easeInOutExpo";
        o.duration = 1e3;
        if (a != null && a != "") {
            o.width = a;
            VMM.Element.width(e, a)
        } else o.width = VMM.Element.width(e);
        if (b != null && b != "") {
            o.height = b;
            VMM.Element.height(e, b)
        } else o.height = VMM.Element.height(e);
        o.nav_width = o.width;
        o.nav_height = 200;
        o.feature_width = o.width;
        VMM.Browser.device == "mobile" ? o.feature_height = o.height: o.feature_height = o.height - o.nav_height;
        if (typeof timeline_config == "object") {
            trace("HAS TIMELINE CONFIG");
            var p;
            for (p in timeline_config) Object.prototype.hasOwnProperty.call(timeline_config, p) && (o[p] = timeline_config[p])
        } else if (typeof c == "object") {
            var p;
            for (p in c) Object.prototype.hasOwnProperty.call(c, p) && (o[p] = c[p])
        }
        var q = !1;
        VMM.Browser.browser == "MSIE" && parseInt(VMM.Browser.version, 10) == 7 && (q = !0);
        this.init = function(a) {
            trace("init");
            VMM.bindEvent(global, r, "DATAREADY");
            if (q) {
                f = VMM.appendAndGetElement(e, "<div>", "feedback", "");
                g = VMM.appendAndGetElement(f, "<div>", "messege", VMM.master_config.i18n.messages.unsupported_ie7)
            } else {
                type.of(a) == "string" ? VMM.Timeline.DataObj.getData(a) : VMM.Timeline.DataObj.getData(h);
                f = VMM.appendAndGetElement(e, "<div>", "feedback", "");
                g = VMM.appendAndGetElement(f, "<div>", "messege", VMM.master_config.i18n.messages.loading_timeline)
            }
        };
        this.iframeLoaded = function() {
            trace("iframeLoaded")
        };
        var z = function(a) {
            VMM.getJSON(a,
                function(a) {
                    m = VMM.Timeline.DataObj.getData(a);
                    VMM.fireEvent(global, "DATAREADY")
                })
        },
        A = function(a) {},
        B = function() {
            VMM.Element.animate(f, o.duration, o.ease * 4, {
                opacity: 0
            },
            C)
        },
        C = function() {
            VMM.Element.detach(f)
        },
        D = function() {
            VMM.attachElement(e, "");
            VMM.appendElement(e, "<div class='container main'><div class='feature'><div class='slider'></div></div><div class='navigation'></div></div>");
            t();
            VMM.bindEvent("div.slider", u, "LOADED");
            VMM.bindEvent("div.navigation", w, "LOADED");
            VMM.bindEvent("div.slider", x, "UPDATE");
            VMM.bindEvent("div.navigation", y, "UPDATE");
            i.init(n);
            j.init(n, m.era);
            VMM.bindEvent(global, t, "resize");
            VMM.bindEvent(global,
                function(a) {
                    a.preventDefault()
                },
                "touchmove")
        },
        E = function(a, b) {
            F();
            var c = a,
            d = "",
            e = {};
            e._text = "";
            e._media = "";
            var f = !1,
            g = !1,
            h = !1;
            if (type.of(b) == "date") {
                f = !0;
                a.type != "start" && (e._text += VMM.createElement("h2", VMM.Util.date.prettyDate(b), "date"));
                c.headline != null && c.headline != "" && c.type != "tweets" && (a.type == "start" ? e._text += VMM.createElement("h2", VMM.Util.linkify_with_twitter(c.headline, "_blank"), "start") : e._text += VMM.createElement("h3", VMM.Util.linkify_with_twitter(c.headline, "_blank")));
                if (c.text != null && c.text != "") {
                    h = !0;
                    e._text += VMM.createElement("p", VMM.Util.linkify_with_twitter(c.text, "_blank"))
                }
                e._text = VMM.createElement("div", e._text, "container");
                e._text = VMM.createElement("div", e._text, "text")
            }
            if (f && c.asset != null && c.asset != "" && c.asset.media != null && c.asset.media != "") {
                g = !0;
                e._media = VMM.MediaElement.create("", c.asset, !0, o.feature_width, o.feature_height)
            }
            if (f) {
                var i = "content-container layout";
                h && (i += "-text");
                g && (i += "-media");
                d = VMM.createElement("div", e._text + e._media, i)
            }
            return d
        },
        F = function() {
            o.width = VMM.Element.width(e);
            o.height = VMM.Element.height(e);
            o.nav_width = o.width;
            o.feature_width = o.width;
            VMM.Browser.device == "mobile" ? o.feature_height = o.height: o.feature_height = o.height - o.nav_height - 3
        },
        G = function() {
            if (o.width < 500) {
                VMM.Element.hide("div.navigation");
                VMM.Element.hide("div.nav-next");
                VMM.Element.hide("div.nav-previous");
                VMM.Element.height(".slider-container-mask", o.height)
            } else {
                VMM.Element.show("div.navigation");
                VMM.Element.show("div.nav-next");
                VMM.Element.show("div.nav-previous");
                VMM.Element.height(".slider-container-mask", o.feature_height)
            }
            o.width < 820 && !(o.width < 500)
        },
        H = function() {
            F();
            if (m.headline != null && m.headline != "" && m.text != null && m.text != "") {
                trace("HAS STARTPAGE");
                var a = {};
                if (m.type == "google spreadsheet") {
                    trace("google spreadsheet startpage date" + m.startDate);
                    a.startdate = new Date(Date.parse(m.startDate));
                    trace(a.startdate)
                } else a.startdate = VMM.Util.parseDate(m.startDate);
                a.uniqueid = VMM.Util.unique_ID(5);
                a.enddate = a.startdate;
                a.title = m.headline;
                a.headline = m.headline;
                a.text = m.text;
                a.type = "start";
                a.date = VMM.Util.date.prettyDate(m.startDate);
                a.asset = m.asset;
                a.fulldate = a.startdate.getTime();
                a.content = E(a, a.startdate);
                a.content != null && a.content != "" && n.push(a)
            }
            for (var b = 0; b < m.date.length; b++) if (m.date[b].startDate != null && m.date[b].startDate != "") {
                var a = {};
                if (m.date[b].type == "tweets") a.startdate = VMM.ExternalAPI.twitter.parseTwitterDate(m.date[b].startDate);
                else if (m.date[b].type == "google spreadsheet") {
                    a.startdate = new Date(Date.parse(m.date[b].startDate));
                    trace(a.startdate)
                } else a.startdate = VMM.Util.parseDate(m.date[b].startDate);
                a.uniqueid = m.date[b].startDate.toString() + "-" + b.toString();
                m.date[b].endDate != null && m.date[b].endDate != "" ? m.date[b].type == "tweets" ? a.enddate = VMM.ExternalAPI.twitter.parseTwitterDate(m.date[b].endDate) : m.date[b].type == "google spreadsheet" ? a.enddate = new Date(Date.parse(m.date[b].endDate)) : a.enddate = VMM.Util.parseDate(m.date[b].endDate) : a.enddate = a.startdate;
                a.title = m.date[b].headline;
                a.type = m.date[b].type;
                a.date = VMM.Util.date.prettyDate(a.startdate);
                a.asset = m.date[b].asset;
                a.fulldate = a.startdate.getTime();
                a.content = E(m.date[b], a.startdate);
                a.content != null && a.content != "" && n.push(a)
            }
            n.sort(function(a, b) {
                return a.fulldate - b.fulldate
            });
            s()
        }
    };
    VMM.Timeline.TimeNav = function(a, b, c) {
        function I() {
            trace("onConfigSet")
        }
        function J(a) {
            VMM.Element.css(B, "left", Math.round(r.width / 2) + 2);
            Y(k, r.ease, r.duration, !0, a)
        }
        function K() {
            VMM.fireEvent(H, "UPDATE")
        }
        function L() {
            trace("CLICK");
            VMM.DragSlider.cancelSlide();
            if (r.multiplier > r.min_multiplier) {
                r.multiplier = r.multiplier - 1;
                r.multiplier < 0 && (r.multiplier = r.min_multiplier);
                $()
            }
        }
        function M() {
            trace("CLICK");
            VMM.DragSlider.cancelSlide();
            if (r.multiplier < r.max_multiplier) {
                r.multiplier = r.multiplier + 1;
                r.multiplier != r.max_multiplier;
                $()
            }
        }
        function N(a) {
            VMM.DragSlider.cancelSlide();
            Y(0);
            K()
        }
        function O(a) {
            VMM.DragSlider.cancelSlide();
            Y(a.data.number);
            K()
        }
        function P(a) {
            VMM.Element.toggleClass(a.data.elem, "zFront")
        }
        function Q(a, b) {
            VMM.Element.animate(t, b.time / 2, r.ease, {
                left: b.left
            })
        }
        trace("VMM.Timeline.TimeNav");
        var d = {},
        e = [],
        f,
        g = [],
        h = [],
        i = [],
        j = {},
        k = 0,
        l = !1,
        m = {
            day: 24,
            month: 12,
            year: 10,
            hour: 60,
            minute: 60,
            second: 1e3,
            decade: 10,
            century: 100,
            millenium: 1e3,
            week: 4.34812141,
            days_in_month: 30.4368499,
            days_in_week: 7,
            weeks_in_month: 4.34812141,
            weeks_in_year: 52.177457,
            days_in_year: 365.242199,
            hours_in_day: 24
        },
        n = {
            day: 864e5,
            week: 7,
            month: 30.4166666667,
            year: 12,
            hour: 24,
            minute: 1440,
            second: 86400,
            decade: 10,
            century: 100,
            millenium: 1e3
        },
        o = {
            type: "year",
            number: 10,
            first: 1970,
            last: 2011,
            multiplier: 100
        },
        p = {
            type: "year",
            number: 10,
            first: 1970,
            last: 2011,
            multiplier: 100
        },
        q = {
            day: {},
            month: {},
            year: {},
            hour: {},
            minute: {},
            second: {},
            decade: {},
            century: {},
            millenium: {},
            week: {}
        },
        r = VMM.Timeline.Config;
        r.something = 0;
        r.nav_width = 100;
        r.nav_height = 200;
        r.timeline = !1;
        r.marker_width = 150;
        r.marker_height = 48;
        r.density = 2;
        r.timeline_width = 900;
        r.interval_width = 200;
        r.rows = [1, 1, 1];
        r.multiplier = 6;
        r.max_multiplier = 16;
        r.min_multiplier = 1;
        r.has_start_page = !1;
        r.rows = [r.marker_height, r.marker_height * 2, 1];
        b != null && b != "" && (r.width = b);
        c != null && c != "" && (r.height = c);
        var s = "",
        l = !1,
        t = "",
        u = "",
        v = "",
        w = "",
        x = "",
        y = "",
        z = "",
        A = "",
        B = "",
        C = "",
        D = "",
        E = "",
        F = "",
        G = {};
        G.nextBtn;
        G.prevBtn;
        G.nextDate;
        G.prevDate;
        G.nextTitle;
        G.prevTitle;
        this.ver = "0.1";
        var H = a;
        this.init = function(a, b) {
            trace("VMM.Timeline.TimeNav init");
            typeof a != "undefined" ? this.setData(a, b) : trace("WAITING ON DATA")
        };
        this.setData = function(a, b) {
            if (typeof a != "undefined") {
                e = a;
                f = b;
                Z()
            } else trace("NO DATA")
        };
        this.setSize = function(a, b) {
            a != null && (r.width = a);
            b != null && (r.height = b);
            l && J()
        };
        this.setMarker = function(a, b, c, d) {
            Y(a, b, c)
        };
        this.getCurrentNumber = function() {
            return k
        };
        var R = function() {
            var a = 2,
            b = 0,
            c = 0;
            for (var d = 0; d < e.length; d++) {
                var i = "",
                j,
                k,
                l,
                m,
                n,
                o;
                j = VMM.appendAndGetElement(u, "<div>", "marker");
                k = VMM.appendAndGetElement(j, "<div>", "flag");
                l = VMM.appendAndGetElement(k, "<div>", "flag-content");
                m = VMM.appendAndGetElement(j, "<div>", "dot");
                n = VMM.appendAndGetElement(j, "<div>", "line");
                o = VMM.appendAndGetElement(n, "<div>", "event-line");
                e[d].asset != null && e[d].asset != "" && VMM.appendElement(l, VMM.MediaElement.thumbnail(e[d].asset, 32, 32));
                VMM.appendElement(l, "<h3>" + VMM.Util.unlinkify(e[d].title) + "</h3><h4>" + e[d].date + "</h4>");
                VMM.Element.attr(j, "id", e[d].uniqueid.toString());
                VMM.bindEvent(k, O, "", {
                    number: d
                });
                VMM.bindEvent(k, P, "mouseenter mouseleave", {
                    number: d,
                    elem: k
                });
                var p = {
                    marker: j,
                    flag: k,
                    lineevent: o,
                    type: "marker"
                };
                if (e[d].type == "start") {
                    trace("BUILD MARKER HAS START PAGE");
                    r.has_start_page = !0;
                    p.type = "start"
                }
                h.push(p)
            }
            for (var q = 0; q < f.length; q++) {
                var i = "",
                s = {
                    content: "",
                    startdate: "",
                    enddate: "",
                    headline: "",
                    uniqueid: "",
                    color: ""
                };
                s.title = f[q].headline;
                s.uniqueid = VMM.Util.unique_ID(4);
                s.color = f[q].color;
                s.content = VMM.appendAndGetElement(u, "<div>", "era");
                VMM.Element.attr(s.content, "id", s.uniqueid);
                VMM.Element.css(s.content, "background", s.color);
                VMM.appendElement(s.content, "<h3>" + VMM.Util.unlinkify(s.title) + "</h3>");
                s.startdate = VMM.Util.parseDate(f[q].startDate);
                s.enddate = VMM.Util.parseDate(f[q].endDate);
                g.push(s)
            }
            T()
        },
        S = function(a, b, c) {
            var d = a.type,
            e = a.multiplier,
            f = U(b),
            g = U(c),
            h = b.months,
            i = c.months;
            if (d == "millenium") {
                h = b.milleniums;
                i = c.milleniums
            } else if (d == "century") {
                h = f.centuries;
                i = g.centuries
            } else if (d == "decade") {
                h = f.decades;
                i = g.decades
            } else if (d == "year") {
                h = f.years;
                i = g.years
            } else if (d == "month") {
                h = f.months;
                i = g.months
            } else if (d == "week") {
                h = f.weeks;
                i = g.weeks
            } else if (d == "day") {
                h = f.days;
                i = g.days
            } else if (d == "hour") {
                h = f.hours;
                i = g.hours
            } else if (d == "minute") {
                h = f.minutes;
                i = g.minutes
            }
            _pos = (h - o.base) * (r.interval_width / r.multiplier);
            _pos_end = (i - o.base) * (r.interval_width / r.multiplier);
            return pos = {
                begin: _pos,
                end: _pos_end
            }
        },
        T = function(a) {
            var b = o.type,
            c = o.multiplier,
            d = 2,
            f = 0,
            i = 0,
            j = 150,
            l = 6,
            m = 0;
            VMM.Element.removeClass(".flag", "row1");
            VMM.Element.removeClass(".flag", "row2");
            VMM.Element.removeClass(".flag", "row3");
            for (var n = 0; n < h.length; n++) {
                var p,
                q = h[n].marker,
                s = h[n].flag,
                u = h[n].lineevent,
                v = S(o, e[n].startdate, e[n].enddate);
                A = v.begin;
                _pos_end = v.end;
                var w = -2;
                A = Math.round(A + w);
                _pos_end = Math.round(_pos_end + w);
                p = Math.round(_pos_end - A);
                if (a) {
                    VMM.Element.stop(q);
                    VMM.Element.animate(q, r.duration / 2, r.ease, {
                        left: A
                    })
                } else VMM.Element.css(q, "left", A);
                n == k && (m = A);
                if (p > 5) {
                    VMM.Element.css(u, "height", l);
                    VMM.Element.css(u, "width", p);
                    VMM.Element.css(u, "top", j)
                }
                if (A - f < r.marker_width + r.spacing) if (d < r.rows.length - 1) d++;
                    else {
                        d = 0;
                        i++
                    } else {
                    i = 0;
                    d = 0
                }
                f = A;
                if (a) {
                    VMM.Element.stop(s);
                    VMM.Element.animate(s, r.duration, r.ease, {
                        top: r.rows[d]
                    })
                } else VMM.Element.css(s, "top", r.rows[d]);
                r.has_start_page && h[n].type == "start" && VMM.Element.visible(q, !1)
            }
            for (var x = 0; x < g.length; x++) {
                var p,
                y = g[x],
                z = y.content,
                A = S(o, y.startdate, y.enddate),
                B = A.end - A.begin,
                C = 25;
                VMM.Element.css(z, "left", A.begin);
                VMM.Element.css(z, "width", B)
            }
            if (a) {
                VMM.Element.stop(t);
                VMM.Element.animate(t, r.duration / 2, r.ease, {
                    left: r.width / 2 - m
                })
            }
        },
        U = function(a, b) {
            var c = {};
            c.days = a / n.day;
            c.weeks = c.days / n.week;
            c.months = c.days / n.month;
            c.years = c.months / n.year;
            c.hours = c.days * n.hour;
            c.minutes = c.days * n.minute;
            c.seconds = c.days * n.second;
            c.decades = c.years / n.decade;
            c.centuries = c.years / n.century;
            c.milleniums = c.years / n.millenium;
            return c
        },
        V = function() {
            var a = U(e[0].startdate),
            b = U(e[e.length - 1].enddate);
            q.millenium.type = "millenium";
            q.millenium.first = a.milleniums;
            q.millenium.base = Math.floor(a.milleniums);
            q.millenium.last = b.milleniums;
            q.millenium.number = j.milleniums;
            q.millenium.multiplier = m.millenium;
            q.millenium.minor = m.millenium;
            q.century.type = "century";
            q.century.first = a.centuries;
            q.century.base = Math.floor(a.centuries);
            q.century.last = b.centuries;
            q.century.number = j.centuries;
            q.century.multiplier = m.century;
            q.century.minor = m.century;
            q.decade.type = "decade";
            q.decade.first = a.decades;
            q.decade.base = Math.floor(a.decades);
            q.decade.last = b.decades;
            q.decade.number = j.decades;
            q.decade.multiplier = m.decade;
            q.decade.minor = m.decade;
            q.year.type = "year";
            q.year.first = a.years;
            q.year.base = Math.floor(a.years);
            q.year.last = b.years;
            q.year.number = j.years;
            q.year.multiplier = 1;
            q.year.minor = m.month;
            q.month.type = "month";
            q.month.first = a.months;
            q.month.base = Math.floor(a.months);
            q.month.last = b.months;
            q.month.number = j.months;
            q.month.multiplier = 1;
            q.month.minor = Math.round(m.week);
            q.week.type = "week";
            q.week.first = a.weeks;
            q.week.base = Math.floor(a.weeks);
            q.week.last = b.weeks;
            q.week.number = j.weeks;
            q.week.multiplier = 1;
            q.week.minor = 7;
            q.day.type = "day";
            q.day.first = a.days;
            q.day.base = Math.floor(a.days);
            q.day.last = b.days;
            q.day.number = j.days;
            q.day.multiplier = 1;
            q.day.minor = 24;
            q.hour.type = "hour";
            q.hour.first = a.hours;
            q.hour.base = Math.floor(a.hours);
            q.hour.last = b.hours;
            q.hour.number = j.hours;
            q.hour.multiplier = 1;
            q.hour.minor = 60;
            q.minute.type = "minute";
            q.minute.first = a.minutes;
            q.minute.base = Math.floor(a.minutes);
            q.minute.last = b.minutes;
            q.minute.number = j.minutes;
            q.minute.multiplier = 1;
            q.minute.minor = 60;
            q.second.type = "decade";
            q.second.first = a.seconds;
            q.second.base = Math.floor(a.seconds);
            q.second.last = b.seconds;
            q.second.number = j.seconds;
            q.second.multiplier = 1;
            q.second.minor = 10
        },
        W = function() {
            VMM.attachElement(x, "");
            VMM.attachElement(y, "");
            o.date = new Date(e[0].startdate.getFullYear(), 0, 1, 0, 0, 0);
            p.date = new Date(e[0].startdate.getFullYear(), 0, 1, 0, 0, 0);
            var a = 0,
            b = 0,
            c = !0,
            d = 0,
            f = 0,
            g = 0;
            for (var h = 0; h < o.number + 1; h++) {
                var i;
                if (o.type == "century") {
                    c && o.date.setFullYear(Math.floor(e[0].startdate.getFullYear() / 100) * 100);
                    o.date.setFullYear(o.date.getFullYear() + a * 100);
                    i = Math.floor(o.date.getFullYear() / 100) * 100
                } else if (o.type == "decade") {
                    c && o.date.setFullYear(Math.floor(e[0].startdate.getFullYear() / 10) * 10);
                    o.date.setFullYear(o.date.getFullYear() + a * 10);
                    i = Math.floor(o.date.getFullYear() / 10) * 10
                } else if (o.type == "year") {
                    ! c;
                    o.date.setFullYear(o.date.getFullYear() + a);
                    i = VMM.Util.date.prettyDate(o.date, !0, o.type)
                } else if (o.type == "month") {
                    c && o.date.setMonth(e[0].startdate.getMonth());
                    o.date.setMonth(o.date.getMonth() + a);
                    i = VMM.Util.date.prettyDate(o.date, !0, o.type)
                } else if (o.type == "week") {
                    if (c) {
                        o.date.setMonth(e[0].startdate.getMonth());
                        o.date.setDate(Math.floor(e[0].startdate.getDate() * 7))
                    }
                    o.date.setDate(o.date.getDate() + a * 7);
                    i = VMM.Util.date.day_abbr[o.date.getDay()] + " " + VMM.Util.date.month_abbr[o.date.getMonth()] + " " + o.date.getDate()
                } else if (o.type == "day") {
                    if (c) {
                        o.date.setMonth(e[0].startdate.getMonth());
                        o.date.setDate(e[0].startdate.getDate())
                    }
                    o.date.setDate(o.date.getDate() + a);
                    i = VMM.Util.date.prettyDate(o.date, !0, o.type)
                } else if (o.type == "hour") {
                    if (c) {
                        o.date.setMonth(e[0].startdate.getMonth());
                        o.date.setDate(e[0].startdate.getDate());
                        o.date.setHours(e[0].startdate.getHours())
                    }
                    o.date.setHours(o.date.getHours() + a);
                    i = VMM.Util.date.prettyDate(o.date, !0, o.type)
                } else if (o.type == "minute") {
                    if (c) {
                        o.date.setMonth(e[0].startdate.getMonth());
                        o.date.setDate(e[0].startdate.getDate());
                        o.date.setHours(e[0].startdate.getHours());
                        o.date.setMinutes(e[0].startdate.getMinutes())
                    }
                    o.date.setMinutes(o.date.getMinutes() + a);
                    i = VMM.Util.date.prettyDate(o.date, !0, o.type)
                } else if (o.type == "second") {
                    if (c) {
                        o.date.setMonth(e[0].startdate.getMonth());
                        o.date.setDate(e[0].startdate.getDate());
                        o.date.setHours(e[0].startdate.getHours());
                        o.date.setMinutes(e[0].startdate.getMinutes());
                        o.date.setSeconds(e[0].startdate.getSeconds())
                    }
                    o.date.setSeconds(o.date.getSeconds() + a);
                    i = VMM.Util.date.prettyDate(o.date, !0, o.type)
                }
                a = 1;
                c && (d = k);
                c = !1;
                var j = S(o, o.date, o.date),
                k = j.begin;
                $interval_date = VMM.appendAndGetElement(x, "<div>", "_idd");
                VMM.appendElement($interval_date, i);
                VMM.Element.css($interval_date, "left", k);
                VMM.Element.css($interval_date, "text-indent", -(VMM.Element.width($interval_date) / 2));
                k - f < 65 ? k - f < 35 ? h % 4 == 0 ? k == 0 ? VMM.Element.css($interval_date, "display", "none") : VMM.Element.css($interval_date, "display", "") : VMM.Element.css($interval_date, "display", "none") : VMM.Util.isEven(h) ? VMM.Element.css($interval_date, "display", "none") : VMM.Element.css($interval_date, "display", "") : VMM.Element.css($interval_date, "display", "");
                f = k
            }
            c = !0;
            _major_first_pos = 0;
            _major_last_pos = 0;
            for (var h = 0; h < Math.ceil(p.number) + 1; h++) {
                var i;
                if (p.type == "century") {
                    c && p.date.setFullYear(Math.floor(e[0].startdate.getFullYear() / 100) * 100);
                    p.date.setFullYear(p.date.getFullYear() + b * 100);
                    i = Math.floor(p.date.getFullYear() / 100) * 100
                } else if (p.type == "decade") {
                    c && p.date.setFullYear(Math.floor(e[0].startdate.getFullYear() / 10) * 10);
                    p.date.setFullYear(p.date.getFullYear() + b * 10);
                    i = Math.floor(p.date.getFullYear() / 10) * 10
                } else if (p.type == "year") {
                    ! c;
                    p.date.setFullYear(p.date.getFullYear() + b);
                    i = p.date.getFullYear()
                } else if (p.type == "month") {
                    c && p.date.setMonth(e[0].startdate.getMonth());
                    p.date.setMonth(p.date.getMonth() + b);
                    i = VMM.Util.date.prettyDate(p.date, !1, p.type)
                } else if (p.type == "week") {
                    if (c) {
                        p.date.setMonth(e[0].startdate.getMonth());
                        p.date.setDate(Math.floor(e[0].startdate.getDate() * 7))
                    }
                    p.date.setDate(p.date.getDate() + b * 7);
                    i = VMM.Util.date.day_abbr[p.date.getDay()] + " " + VMM.Util.date.month_abbr[p.date.getMonth()] + " " + p.date.getDate()
                } else if (p.type == "day") {
                    if (c) {
                        p.date.setMonth(e[0].startdate.getMonth());
                        p.date.setDate(e[0].startdate.getDate())
                    }
                    p.date.setDate(p.date.getDate() + b);
                    i = VMM.Util.date.prettyDate(p.date, !0, p.type)
                } else if (p.type == "hour") {
                    if (c) {
                        p.date.setMonth(e[0].startdate.getMonth());
                        p.date.setDate(e[0].startdate.getDate());
                        p.date.setHours(e[0].startdate.getHours())
                    }
                    p.date.setHours(p.date.getHours() + b);
                    i = VMM.Util.date.prettyDate(p.date, !0, p.type)
                } else if (p.type == "minute") {
                    if (c) {
                        p.date.setMonth(e[0].startdate.getMonth());
                        p.date.setDate(e[0].startdate.getDate());
                        p.date.setHours(e[0].startdate.getHours());
                        p.date.setMinutes(e[0].startdate.getMinutes())
                    }
                    p.date.setMinutes(p.date.getMinutes() + b);
                    i = VMM.Util.date.prettyDate(p.date, !0, p.type)
                } else if (p.type == "second") {
                    if (c) {
                        p.date.setMonth(e[0].startdate.getMonth());
                        p.date.setDate(e[0].startdate.getDate());
                        p.date.setHours(e[0].startdate.getHours());
                        p.date.setMinutes(e[0].startdate.getMinutes());
                        p.date.setSeconds(e[0].startdate.getSeconds())
                    }
                    p.date.setSeconds(p.date.getSeconds() + b);
                    i = VMM.Util.date.prettyDate(p.date, !0, p.type)
                }
                trace("interval_major.type " + p.type);
                b = 1;
                var j = S(o, p.date, p.date),
                k = j.begin;
                $interval_date = VMM.appendAndGetElement(y, "<div>", "major");
                VMM.appendElement($interval_date, i);
                VMM.Element.css($interval_date, "left", k);
                VMM.Element.css($interval_date, "left", k);
                VMM.Element.css($interval_date, "text-indent", -(VMM.Element.width($interval_date) / 2));
                c && (_major_first_pos = k);
                c = !1;
                g = k;
                _major_last_pos = k
            }
            VMM.Element.width(u, o.number * (r.interval_width / r.multiplier));
            _minor_pos_offset = 50;
            var l = _major_last_pos - _major_first_pos + _minor_pos_offset * 6,
            m = f + _minor_pos_offset * 6;
            l < m ? VMM.Element.width(C, m) : VMM.Element.width(C, l);
            VMM.Element.css(C, "left", _major_first_pos - _minor_pos_offset);
            r.timeline_width = VMM.Element.width(x)
        },
        X = function() {
            j = U(e[e.length - 1].enddate - e[0].startdate, !0);
            V();
            if (j.milleniums > e.length / r.density) o = q.millenium;
            else if (j.centuries > e.length / r.density) o = Math.ceil(q.century);
            else if (j.decades > e.length / r.density) o = q.decade;
            else if (j.years > e.length / r.density) o = q.year;
            else if (j.months > e.length / r.density) o = q.month;
            else if (j.days > e.length / r.density) o = q.day;
            else if (j.hours > e.length / r.density) o = q.hour;
            else if (j.minutes > e.length / r.density) o = q.minute;
            else if (j.seconds > e.length / r.density) o = q.second;
            else {
                trace("NO ******* IDEA WHAT THE TYPE SHOULD BE");
                o.type = "unknown"
            }
            if (j.milleniums >= 1) p = q.millenium;
            else if (j.centuries >= 1) p = q.century;
            else if (j.decades >= 1) p = q.decade;
            else if (j.years >= 1) p = q.year;
            else if (j.months > 1) p = q.month;
            else if (j.weeks > 1) p = q.month;
            else if (j.days > 1) p = q.day;
            else if (j.hours > 1) p = q.hour;
            else if (j.minutes > 1) p = q.minute;
            else if (j.seconds > 1) p = q.minute;
            else {
                trace("NO ******* IDEA WHAT THE TYPE SHOULD BE");
                p.type = "unknown"
            }
            C = VMM.appendAndGetElement(w, "<div>", "minor");
            W()
        },
        Y = function(a, b, c, d, e) {
            k = a;
            var f = r.ease,
            g = r.duration,
            i = !1,
            j = !1;
            k == 0 && (j = !0);
            k + 1 == h.length && (i = !0);
            b != null && b != "" && (f = b);
            c != null && c != "" && (g = c);
            var l = VMM.Element.position(h[k].marker);
            for (var m = 0; m < h.length; m++) VMM.Element.removeClass(h[m].marker, "active");
            if (r.has_start_page && h[k].type == "start") {
                VMM.Element.visible(h[k].marker, !1);
                VMM.Element.addClass(h[k].marker, "start")
            }
            VMM.Element.addClass(h[k].marker, "active");
            ! j;
            ! i;
            VMM.Element.stop(t);
            VMM.Element.animate(t, g, f, {
                left: r.width / 2 - l.left
            })
        },
        Z = function() {
            VMM.attachElement(H, "");
            t = VMM.appendAndGetElement(H, "<div>", "timenav");
            u = VMM.appendAndGetElement(t, "<div>", "content");
            v = VMM.appendAndGetElement(t, "<div>", "time");
            w = VMM.appendAndGetElement(v, "<div>", "time-interval-minor");
            y = VMM.appendAndGetElement(v, "<div>", "time-interval-major");
            x = VMM.appendAndGetElement(v, "<div>", "time-interval");
            z = VMM.appendAndGetElement(H, "<div>", "timenav-background");
            B = VMM.appendAndGetElement(z, "<div>", "timenav-line");
            A = VMM.appendAndGetElement(z, "<div>", "timenav-interval-background", "<div class='top-highlight'></div>");
            X();
            R();
            J(!0);
            VMM.fireEvent(H, "LOADED");
            D = VMM.appendAndGetElement(H, "<div>", "toolbar");
            if (r.has_start_page) {
                $backhome = VMM.appendAndGetElement(D, "<div>", "back-home", "<div class='icon'></div>");
                VMM.bindEvent(".back-home", N, "click");
                VMM.Element.css(D, "top", 27)
            }
            E = VMM.appendAndGetElement(D, "<div>", "zoom-in", "<div class='icon'></div>");
            F = VMM.appendAndGetElement(D, "<div>", "zoom-out", "<div class='icon'></div>");
            VMM.Element.attribute($backhome, "title", VMM.master_config.i18n.messages.return_to_title);
            VMM.Element.attribute($backhome, "rel", "tooltip");
            VMM.Element.attribute(E, "title", VMM.master_config.i18n.messages.expand_timeline);
            VMM.Element.attribute(E, "rel", "tooltip");
            VMM.Element.attribute(F, "title", VMM.master_config.i18n.messages.contract_timeline);
            VMM.Element.attribute(F, "rel", "tooltip");
            VMM.bindEvent(".zoom-in", L, "click");
            VMM.bindEvent(".zoom-out", M, "click");
            D.tooltip({
                selector: "div[rel=tooltip]",
                placement: "right"
            });
            if (VMM.Browser.device == "mobile" || VMM.Browser.device == "tablet") {
                VMM.TouchSlider.createPanel(z, t, r.width, r.spacing, !1);
                VMM.bindEvent(t, Q, "TOUCHUPDATE")
            } else VMM.DragSlider.createPanel(H, t, r.width, r.spacing, !1);
            l = !0
        },
        $ = function() {
            W();
            T(!0)
        }
    };
    VMM.Timeline.Config = {};
    VMM.Timeline.DataObj = {
        data_obj: {},
        model_array: [],
        getData: function(a) {
            data = VMM.Timeline.DataObj.data_obj;
            if (type.of(a) != "string") {
                trace("DATA SOURCE: NOT JSON");
                trace("TRYING HTML PARSE");
                VMM.Timeline.DataObj.parseHTML(a)
            } else if (a.match("%23")) {
                trace("DATA SOURCE: TWITTER SEARCH");
                VMM.Timeline.DataObj.model_Tweets.getData("%23medill")
            } else if (a.match("spreadsheet")) {
                trace("DATA SOURCE: GOOGLE SPREADSHEET");
                VMM.Timeline.DataObj.model_GoogleSpreadsheet.getData(a)
            } else {
                trace("DATA SOURCE: JSON");
                VMM.getJSON(a, VMM.Timeline.DataObj.parseJSON)
            }
        },
        parseHTML: function(a) {
            trace("parseHTML");
            var b = VMM.Timeline.DataObj.data_template_obj;
            if (VMM.Element.find("#timeline section", "time")[0]) {
                b.timeline.startDate = VMM.Element.html(VMM.Element.find("#timeline section", "time")[0]);
                b.timeline.headline = VMM.Element.html(VMM.Element.find("#timeline section", "h2"));
                b.timeline.text = VMM.Element.html(VMM.Element.find("#timeline section", "article"));
                var c = !1;
                if (VMM.Element.find("#timeline section", "figure img").length != 0) {
                    c = !0;
                    b.timeline.asset.media = VMM.Element.attr(VMM.Element.find("#timeline section", "figure img"), "src")
                } else if (VMM.Element.find("#timeline section", "figure a").length != 0) {
                    c = !0;
                    b.timeline.asset.media = VMM.Element.attr(VMM.Element.find("#timeline section", "figure a"), "href")
                }
                if (c) {
                    VMM.Element.find("#timeline section", "cite").length != 0 && (b.timeline.asset.credit = VMM.Element.html(VMM.Element.find("#timeline section", "cite")));
                    VMM.Element.find(this, "figcaption").length != 0 && (b.timeline.asset.caption = VMM.Element.html(VMM.Element.find("#timeline section", "figcaption")))
                }
            }
            VMM.Element.each("#timeline li",
                function(a, c) {
                    var d = !1,
                    e = {
                        type: "default",
                        startDate: "",
                        headline: "",
                        text: "",
                        asset: {
                            media: "",
                            credit: "",
                            caption: ""
                        },
                        tags: "Optional"
                    };
                    if (VMM.Element.find(this, "time") != 0) {
                        d = !0;
                        e.startDate = VMM.Element.html(VMM.Element.find(this, "time")[0]);
                        VMM.Element.find(this, "time")[1] && (e.endDate = VMM.Element.html(VMM.Element.find(this, "time")[0]));
                        e.headline = VMM.Element.html(VMM.Element.find(this, "h3"));
                        e.text = VMM.Element.html(VMM.Element.find(this, "article"));
                        var f = !1;
                        if (VMM.Element.find(this, "figure img").length != 0) {
                            f = !0;
                            e.asset.media = VMM.Element.attr(VMM.Element.find(this, "figure img"), "src")
                        } else if (VMM.Element.find(this, "figure a").length != 0) {
                            f = !0;
                            e.asset.media = VMM.Element.attr(VMM.Element.find(this, "figure a"), "href")
                        }
                        if (f) {
                            VMM.Element.find(this, "cite").length != 0 && (e.asset.credit = VMM.Element.html(VMM.Element.find(this, "cite")));
                            VMM.Element.find(this, "figcaption").length != 0 && (e.asset.caption = VMM.Element.html(VMM.Element.find(this, "figcaption")))
                        }
                        trace(e);
                        b.timeline.date.push(e)
                    }
                });
            VMM.fireEvent(global, "DATAREADY", b)
        },
        parseJSON: function(a) {
            if (a.timeline.type == "default") {
                trace("DATA SOURCE: JSON STANDARD TIMELINE");
                VMM.fireEvent(global, "DATAREADY", a)
            } else if (a.timeline.type == "twitter") {
                trace("DATA SOURCE: JSON TWEETS");
                VMM.Timeline.DataObj.model_Tweets.buildData(a)
            } else {
                trace("DATA SOURCE: NO IDEA");
                trace(type.of(a.timeline))
            }
        },
        model_Tweets: {
            type: "twitter",
            buildData: function(a) {
                VMM.bindEvent(global, VMM.Timeline.DataObj.model_Tweets.onTwitterDataReady, "TWEETSLOADED");
                VMM.ExternalAPI.twitter.getTweets(a.timeline.tweets)
            },
            getData: function(a) {
                VMM.bindEvent(global, VMM.Timeline.DataObj.model_Tweets.onTwitterDataReady, "TWEETSLOADED");
                VMM.ExternalAPI.twitter.getTweetSearch(a)
            },
            onTwitterDataReady: function(a, b) {
                var c = VMM.Timeline.DataObj.data_template_obj;
                for (var d = 0; d < b.tweetdata.length; d++) {
                    var e = {
                        type: "tweets",
                        startDate: "",
                        headline: "",
                        text: "",
                        asset: {
                            media: "",
                            credit: "",
                            caption: ""
                        },
                        tags: "Optional"
                    };
                    e.startDate = b.tweetdata[d].raw.created_at;
                    type.of(b.tweetdata[d].raw.from_user_name) ? e.headline = b.tweetdata[d].raw.from_user_name + " (<a href='https://twitter.com/" + b.tweetdata[d].raw.from_user + "'>" + "@" + b.tweetdata[d].raw.from_user + "</a>)": e.headline = b.tweetdata[d].raw.user.name + " (<a href='https://twitter.com/" + b.tweetdata[d].raw.user.screen_name + "'>" + "@" + b.tweetdata[d].raw.user.screen_name + "</a>)";
                    e.asset.media = b.tweetdata[d].content;
                    c.timeline.date.push(e)
                }
                VMM.fireEvent(global, "DATAREADY", c)
            }
        },
        model_GoogleSpreadsheet: {
            type: "google spreadsheet",
            getData: function(a) {
                var b = VMM.Util.getUrlVars(a).key,
                c = "https://spreadsheets.google.com/feeds/list/" + b + "/od6/public/values?alt=json";
                VMM.getJSON(c, VMM.Timeline.DataObj.model_GoogleSpreadsheet.buildData)
            },
            buildData: function(a) {
                var b = VMM.Timeline.DataObj.data_template_obj;
                for (var c = 0; c < a.feed.entry.length; c++) {
                    var d = a.feed.entry[c];
                    if (d.gsx$titleslide.$t.match("start")) {
                        b.timeline.startDate = d.gsx$startdate.$t;
                        b.timeline.headline = d.gsx$headline.$t;
                        b.timeline.asset.media = d.gsx$media.$t;
                        b.timeline.asset.caption = d.gsx$mediacaption.$t;
                        b.timeline.asset.credit = d.gsx$mediacredit.$t;
                        b.timeline.text = d.gsx$text.$t;
                        b.timeline.type = "google spreadsheet"
                    } else {
                        var e = {
                            type: "google spreadsheet",
                            startDate: "",
                            endDate: "",
                            headline: "",
                            text: "",
                            type: "google spreadsheet",
                            asset: {
                                media: "",
                                credit: "",
                                caption: ""
                            },
                            tags: "Optional"
                        };
                        e.endDate = d.gsx$enddate.$t;
                        e.startDate = d.gsx$startdate.$t;
                        e.headline = d.gsx$headline.$t;
                        e.asset.media = d.gsx$media.$t;
                        e.asset.caption = d.gsx$mediacaption.$t;
                        e.asset.credit = d.gsx$mediacredit.$t;
                        e.text = d.gsx$text.$t;
                        b.timeline.date.push(e)
                    }
                }
                VMM.fireEvent(global, "DATAREADY", b)
            }
        },
        data_template_obj: {
            timeline: {
                headline: "",
                description: "",
                asset: {
                    media: "",
                    credit: "",
                    caption: ""
                },
                date: []
            }
        },
        date_obj: {
            startDate: "2012,2,2,11,30",
            headline: "",
            text: "",
            asset: {
                media: "http://youtu.be/vjVfu8-Wp6s",
                credit: "",
                caption: ""
            },
            tags: "Optional"
        }
    }
};