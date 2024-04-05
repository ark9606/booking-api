export class GetRoomAvailabilityResponse {
  totalDateRange: { from: Date; to: Date };
  periodsOfAvailability: [string, string][];
}
