"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = void 0;
var BookingService = /** @class */ (function () {
    function BookingService(apiClient) {
        this.apiClient = apiClient;
        this.prefix = "bookings";
    }
    BookingService.prototype.getBooking = function () { };
    BookingService.prototype.getBookings = function () { };
    BookingService.prototype.addBooking = function () { };
    BookingService.prototype.updateBooking = function () { };
    BookingService.prototype.deleteBooking = function () { };
    return BookingService;
}());
exports.BookingService = BookingService;
