import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import emailjs from 'emailjs-com';

const ContactForm = ({ onClose }) => {
    const [form, setForm] = useState({
        name: '',
        surname: '',
        email: '',
        plant: '',
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.surname || !form.email || !form.plant) {
            setErrorMessage('Veuillez remplir tous les champs.');
            return;
        }

        try {
            const response = await emailjs.send(
                'votre_service_id',
                'votre_template_id',
                form,
                'votre_user_id'
            );
            console.log('✅ Email envoyé', response);
            setSuccessMessage('Message envoyé avec succès !');
            setErrorMessage('');
            if (onClose) onClose();
        } catch (err) {
            console.error('❌ Erreur EmailJS:', err);
            setErrorMessage('Échec de l\'envoi. Veuillez réessayer plus tard.');
        }
    };

    return (
        <Box sx={{ padding: '30px', backgroundColor: '#f9f9f9', borderRadius: '12px', maxWidth: '500px', margin: '0 auto' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, marginBottom: 3 }}>
                <img src="/images/logo.png" alt="Logo" style={{ width: '50px' }} />
                <Typography variant="h6">Contactez-nous</Typography>
            </Box>

            <form onSubmit={handleSubmit}>
                <TextField label="Nom" name="name" value={form.name} onChange={handleChange} fullWidth margin="normal" />
                <TextField label="Prénom" name="surname" value={form.surname} onChange={handleChange} fullWidth margin="normal" />
                <TextField label="Email" name="email" value={form.email} onChange={handleChange} type="email" fullWidth margin="normal" />
                <TextField label="Plante" name="plant" value={form.plant} onChange={handleChange} fullWidth margin="normal" />
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Envoyer</Button>
            </form>

            {successMessage && <Typography color="green" textAlign="center" sx={{ mt: 2 }}>{successMessage}</Typography>}
            {errorMessage && <Typography color="red" textAlign="center" sx={{ mt: 2 }}>{errorMessage}</Typography>}
        </Box>
    );
};

export default ContactForm;
