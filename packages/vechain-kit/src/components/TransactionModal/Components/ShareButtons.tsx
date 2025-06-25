import { motion } from 'framer-motion';
import { FaTelegramPlane } from 'react-icons/fa';
import { FaWhatsapp } from 'react-icons/fa6';
import { RiTwitterXFill } from 'react-icons/ri';
import React from 'react';
import { useVeChainKitConfig } from '@/providers';

const TWITTER_INJECT = 'https://twitter.com/intent/tweet?text=';

const WHATSAPP_INJECT = 'https://wa.me/?text=';

const TELEGRAM_INJECT = 'https://telegram.me/share/url?url=';

// bouncing circle button animation provider
const BouncingAnimation = ({ children }: { children: React.ReactNode }) => (
    <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{
            duration: 0.5,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatDelay:
                (crypto.getRandomValues(new Uint32Array(1))[0] / 2 ** 32) * 5,
        }}
        animate={{
            y: [0, -2, 0],
            rotate: [0, 10, -10, 0],
        }}
    >
        {children}
    </motion.div>
);

type Props = {
    descriptionEncoded: string;
    url?: string;
    facebookHashtag?: string;
}

export const ShareButtons = ({ descriptionEncoded }: Props) => {
    const { darkMode: isDark } = useVeChainKitConfig();

    return (
        <div className="flex items-center" ga>
            <BouncingAnimation>
                <a
                    href={`${TWITTER_INJECT}${descriptionEncoded}`}
                    isExternal
                >
                    <div
                    >
                        <RiTwitterXFill size={22} />
                    </div>
                </a>
            </BouncingAnimation>
            <BouncingAnimation>
                <a
                    href={`${TELEGRAM_INJECT}${descriptionEncoded}`}
                    isExternal
                >
                    <div>
                        <FaTelegramPlane color="white" size={22} />
                    </div>
                </a>
            </BouncingAnimation>
            <BouncingAnimation>
                <a
                    href={`${WHATSAPP_INJECT}${descriptionEncoded}`}
                    isExternal
                >
                    <div>
                        <FaWhatsapp size={22} color="white" />
                    </div>
                </a>
            </BouncingAnimation>
        </div>
    );
};
