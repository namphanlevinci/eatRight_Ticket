import notification_sound from '../assets/sound/notification.mp3';

export const playNotiSound = () => {
    const audio = new Audio(notification_sound);
    audio.play();
};
