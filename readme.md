Taller Introducción Azure
Parte 1



La Fintech Visaji es un emprendimiento que dispone de un proceso de microcréditos para vivienda. La Fintech tiene un personal financiero altamente calificado que evalúa y aprueba las solicitudes de los créditos. Sin embargo, no tienen una alta capacidad tecnológica porque su capital inicial fue invertido en la captación de “leads” y materialización de clientes. 
Como su negocio es manejado altamente de forma operativa, para iniciar con su proceso los solicitantes del crédito comienzan diligenciando un formulario físico con algunos datos básicos; los analistas financieros, con una plantilla, crean un archivo .pdf con el caso del microcrédito, contactan al cliente y le solicitan una imagen del inmueble, los analistas financieros usan una aplicación de un tercero para editar la imagen agregándole, como marca de agua, algunos datos del solicitante para la revisión del crédito y por procesos de auditoría. Por último, cada analista financiero evalúa el caso a detalle y redacta un correo a cada cliente indicando si fue aprobado e indicando las razones.
Para tener una mayor captación de clientes y una reducción en costos operativos se ha tomado la decisión de invertir en un desarrollo tecnológico “In-House” que permita soportar el proceso y ser más eficientes.
Para este proyecto, se requiere crear un portal web que permita a los usuarios registrarse al sistema con unos datos básicos y subir una imagen de la propiedad a validar.
Por otra parte, en el mismo portal web, los analistas financieros visualizan los casos pendientes por validar del más reciente al más antiguo. Al acceder al detalle del caso, para validarlo, el analista tiene los archivos de la solicitud del caso (Como un archivo .pdf) y un archivo .jpeg con la imagen con una resolución de 720p (1280x720) que contenga en la parte inferior derecha el nombre y la cédula del solicitante como marca de agua (Ambos archivos se pueden descargar, pero no es necesario que se visualicen en el aplicativo web). En el detalle del caso debe haber una opción de aprobación o rechazo, junto con un comentario. Finalmente, tras evaluar el caso se debe enviar un correo de confirmación al usuario solicitante.
Para el desarrollo tecnológico se propone la siguiente arquitectura On Premise donde se despliega en un servidor interno la aplicación web, la cual gestiona los datos transaccionales en una base de datos relacional y persiste los archivos en un folder del sistema operativo.

Figura 1. Architectura On Premise


Para la implementación del proyecto se proponen algunos mockups para tener en cuenta las intenciones del proceso.
Se requiere tener una página de inicio de la Fintech la cual contiene información de la empresa y de los servicios ofrecidos. Por otra parte, contiene una redirección a una página que permite la solicitud del crédito, por parte de los clientes, y, por otra parte, contiene una redirección al módulo de evaluación de los solicitudes por parte de los analistas financieros.

Figura 2. Página inicial
En la solicitud del crédito se registran datos básicos del cliente y datos del crédito, incluida la imagen del inmueble. Todos los datos son obligatorios y requeridos para la solicitud formal.

Figura 3. Solicitud de crédito

Al acceder a la opción de acceso de analistas, se presenta una pantalla de inicio de sesión, en el cual se solicita usuario y contraseña (Los usuarios vienen por defecto cargados en el sistema y no requieren de un módulo adicional). 

Figura 4. Acceso de analistas
Al iniciar sesión, como analista financiero, se presenta una pantalla de todas las solicitudes de crédito pendientes de evaluación (Sólo se presentan las solicitudes que tengan listos para descargar sus archivos de formato de solicitud e imagen con marca de agua) ordenadas desde la más reciente a la más antigua. Adicionalmente, se tiene una opción para evaluar la solicitud donde se presenta la información del crédito y se permite evaluar la solicitud.

Figura 5. Solicitud de crédito



Al seleccionar una solicitud, se presenta la información del caso y se permite descargar el archivo de formato de solicitud del caso y la imagen del inmueble con marca de agua. Adicionalmente, se tiene una sección donde se presentan las observaciones y se evalúa la aprobación del caso. Finalmente, cuando se haya evaluado el caso se debe enviar un correo automático al solicitante indicando las observaciones y el resultado final de la aprobación del caso. Cabe resaltar que, tras evaluar un caso, este no debe aparecer en la bandeja de solicitudes a aprobar de la Figura 5.

Figura 6. Evaluación de crédito
Para el desarrollo de este proyecto se puede hacer en sistema operativo Windows o Linux, con una base de datos relacional SQL Server y se puede usar como lenguaje de programación ASP .NET, ASP .NET Core, Java, Ruby, Node.js, Python o PHP.



