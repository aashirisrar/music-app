import { Song } from "@/types/route";

import useAuthModal from "./useAuthModal";
import useSubscribeModal from "./useSubscribeModal";
import usePlayer from "./usePlayer"
import { useUser } from "./useUser";

const useOnPlay = (songs: Song[]) => {
    const player = usePlayer();
    const authModal = useAuthModal()
    const subscribeModal = useSubscribeModal()
    const { user, subscription } = useUser()

    const onPlay = (id: string) => {
        if (!user) {
            return authModal.onOpen()
        }

        if (!subscription) {
            return subscribeModal.onOpen()
        }

        player.setId(id);
        player.setIds(songs.map((song) => song.id))
    }

    return onPlay
}

export default useOnPlay