"use client";

import { BookingModal as _BookingModal } from "@repo/ui/artist-profile";
import { TIME_SLOTS } from "@repo/constants/booking";
import type { ArtistService } from "@repo/ui/artist-profile";

type Props = {
  artistName: string;
  services: ArtistService[];
  initialService?: ArtistService;
  onClose: () => void;
  onNavigateToCheckout: (params: URLSearchParams) => void;
};

export function BookingModal(props: Props) {
  return <_BookingModal {...props} timeSlots={TIME_SLOTS} />;
}
