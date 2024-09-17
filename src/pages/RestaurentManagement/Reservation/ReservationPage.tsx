import React, { useState } from 'react';
import { EnableReservation } from './components/EnableReservation';
import FormReservation from './components/FormReservation';

export default function RestaurentReservationPage() {
    const [isEnabled, setIsEnabled] = useState(false);

    return (
        <div>
            <EnableReservation
                isEnabled={isEnabled}
                onChange={(checked) => setIsEnabled(checked)}
            />
            {isEnabled && <FormReservation />}
        </div>
    );
}
