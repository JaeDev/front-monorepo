'use client'

import React from 'react';

interface CoachTipProps {
    isVisible: boolean;
    message: string | React.ReactNode;
}

const CoachTip = ({ isVisible, message }: CoachTipProps) => {
    if (!isVisible) return null;

    return (
        <div className="mt-8 p-4 bg-gray-900 rounded-2xl text-white">
            <div className="flex items-center gap-2 mb-2">
            <span className="text-sm">💬</span>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Coach's Insight</span>
            </div>
            <p className="text-sm leading-snug font-medium">
                {message}
            </p>
      </div>
    );
};

export default CoachTip;