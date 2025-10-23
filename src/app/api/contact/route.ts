
import { type NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  const { name, email, message } = await request.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
  }

  // ¡IMPORTANTE! Necesitarás configurar estas variables de entorno.
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  const toEmail = 'aventura.sur.rsa@gmail.com';

  if (!user || !pass) {
    console.error('Las credenciales de correo (EMAIL_USER, EMAIL_PASS) no están configuradas en las variables de entorno.');
    return NextResponse.json({ error: 'Error de configuración del servidor.' }, { status: 500 });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: user,
      pass: pass,
    },
  });

  const mailOptions = {
    from: `"${name}" <${user}>`, // El correo desde el que se envía (tu cuenta de Gmail)
    to: toEmail, // El correo de tu empresa donde recibirás los mensajes
    replyTo: email, // Para que al responder, le respondas al cliente
    subject: `Nuevo mensaje de ${name} desde la web`,
    text: `
      Has recibido un nuevo mensaje desde el formulario de contacto de tu sitio web.

      Nombre: ${name}
      Correo: ${email}
      Mensaje:
      ${message}
    `,
    html: `
      <h2>Nuevo Mensaje del Formulario de Contacto</h2>
      <p><strong>Nombre:</strong> ${name}</p>
      <p><strong>Correo Electrónico:</strong> <a href="mailto:${email}">${email}</a></p>
      <p><strong>Mensaje:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true, message: '¡Mensaje enviado con éxito!' });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    return NextResponse.json({ error: 'No se pudo enviar el mensaje.' }, { status: 500 });
  }
}
