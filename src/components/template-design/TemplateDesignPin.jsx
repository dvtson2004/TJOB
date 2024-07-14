import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FadeInOutWIthOpacity, scaleInOut } from '../../animation';
import { BiFolderPlus, BiHeart } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const TemplateDesignPin = ({ data, index }) => {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    const addToCollection = async () => {
        // Add to collection logic
    };

    const addToFavourite = async () => {
        // Add to favourite logic
    };

    const handleRouteNavigation = () => {
        navigate(`/resumeDetail/${data?.id}`, { replace: true });
    };

    return (
        <motion.div
            key={data?.id}
            {...scaleInOut(index)}
        >
            <div className='tw-w-full tw-h-[450px] 2xl:tw-h-[640px] tw-rounded-md tw-bg-gray-300 tw-overflow-hidden tw-relative'
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <img
                    src={data?.imageURL}
                    className='tw-w-full tw-h-full tw-object-cover'
                    alt=''
                />
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            {...FadeInOutWIthOpacity}
                            onClick={handleRouteNavigation}
                            className='tw-absolute tw-inset-0 tw-bg-[rgba(0,0,0,0.4)] tw-flex tw-flex-col tw-items-center tw-justify-center tw-px-4 tw-py-3 tw-z-50 tw-cursor-pointer'
                        >
                            {/* <div className='tw-flex tw-flex-col tw-items-end tw-justify-start tw-w-full tw-gap-8'>
                                <InnerBoxCard label={'Add to collection'} Icon={BiFolderPlus} onHandle={addToCollection} />
                                <InnerBoxCard label={'Add to favourite'} Icon={BiHeart} onHandle={addToFavourite} />
                            </div> */}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

const InnerBoxCard = ({ label, Icon, onHandle }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            onClick={onHandle}
            className='tw-w-10 tw-h-10 tw-rounded-md tw-bg-gray-200 tw-flex tw-items-center tw-justify-center hover:tw-shadow-md tw-relative'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Icon className='tw-text-base tw-text-txtPrimary tw-cursor-pointer' />
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, scale: .6, x: 50 }}
                        animate={{ opacity: 1, scale: 1, x: 50 }}
                        exit={{ opacity: 0, scale: .6, x: 50 }}
                        className='tw-px-3 tw-py-2 tw-rounded-md tw-bg-gray-200 tw-absolute tw--left-44 after:tw-w-2 after:tw-h-2 after:tw-absolute after:tw--right-1 after:tw-bg-gray-200 after:tw-top-[14px] after:tw-rotate-45'
                    >
                        <p>{label}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default TemplateDesignPin;
