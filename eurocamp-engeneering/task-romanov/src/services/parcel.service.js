"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParcService = void 0;
var ParcelService = /** @class */ (function () {
  function ParcService(apiClient) {
    this.apiClient = apiClient;
    this.prefix = "parcs";
  }
  ParcService.prototype.getBookings = function () {
    return this.apiClient.get(this.prefix);
  };
  return ParcService;
})();
exports.ParcService = ParcelService;
