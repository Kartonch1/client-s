import ImagesList from './imagesList/ImagesList';
import Nav from './Nav';
import Upload from './upload/Upload';
import { Container } from '@mui/material';
import AuthContext from "../context/AuthContext";
import Modal from './Modal';
import MainNotification from './MainNotification';
import Loading from './Loading';

function UDOID() {
    return (
        <Container maxWidth="lg" sx={{ textAlign: 'center', mt: '3rem' }}>
            <AuthContext>
                <Loading />
                <Modal />
                <MainNotification />
                <Nav />
                <Upload />
                <ImagesList />
            </AuthContext>
        </Container>
    );
}

export default UDOID;
