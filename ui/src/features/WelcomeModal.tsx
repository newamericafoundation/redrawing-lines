import { useEffect, useState } from 'react';
import Button from 'src/components/Button';
import Modal from 'src/components/Modal';
import { Typography } from 'src/components/Typography';

export const WelcomeModal: React.FC = () => {
    const [showWelcome, setShowWelcome] = useState(false);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const inReport = queryParams.get('inReport');

        if (inReport === null) {
            setShowWelcome(true);
        }
    }, []);

    const handleClose = () => {
        setShowWelcome(false);
    };

    return (
        <Modal
            title="Redrawing The Lines"
            open={showWelcome}
            handleClose={handleClose}
            action={
                <Button title="Continue to application" onClick={handleClose}>
                    <Typography variant="body">Continue</Typography>
                </Button>
            }
        >
            <section>
                <Typography variant="h3" as="h2">
                    Welcome
                </Typography>
                <Typography variant="body">
                    <strong>Redrawing The Lines</strong> explores ... lorem
                    ipsum dolor sit amet, consectetur{' '}
                    <strong>adipiscing</strong> elit. Cras mattis, enim eu
                    placerat sagittis, risus augue porta dui, non{' '}
                    <strong>maximus</strong> nulla ante nec diam.{' '}
                    <strong>Integer</strong> in sagittis massa. In et lacinia
                    felis. <strong>Donec</strong> sit amet turpis ac ante
                    efficitur scelerisque.
                </Typography>
            </section>
        </Modal>
    );
};
