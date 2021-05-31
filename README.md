# MiFIELDemoZZ
Código demo del uso, funcionamiento e implementación de la librería MiFIEL

## Instalación
- Dentro de la carpeta del proyecto, ejecute el comando `composer install`. Si no tiene **Composer** instalado puede consultar la siguiente liga [ [composer]() ]
- Configurar autoload de librerias composer dentro del archivo `{[ROOTDIR]}/application/config/config.php`, buscar sección `$config['composer_autoload']` y pegar el siguiente valor `FCPATH.'vendor/autoload.php'`, deberá quedar de la siguiente manera `$config['composer_autoload'] = FCPATH.'vendor/autoload.php';`
- Configurar archivo `{[ROOTDIR]}/config.php`, en la sección `proyect_name` seleccionar la ubicación del proyecto, si se encuentra en raíz de servidor, dejar en blanco ''.

# MiFIELLib
## _Librería para el firmado digital_

Librería codificada en lenguaje PHP para el framework CODEIGNITER v3 

## Instalación
- Instalar la versión más reciente de MiFIEL, ejecute el comando `composer install mifiel/api-client`. Si no tiene **Composer** instalado puede consultar la siguiente liga [ [composer]() ]
- Configurar autoload de librerias composer dentro del archivo `{[ROOTDIR]}/application/config/config.php`, buscar sección `$config['composer_autoload']` y pegar el siguiente valor `FCPATH.'vendor/autoload.php'`, deberà quedar de la siguiente manera `$config['composer_autoload'] = FCPATH.'vendor/autoload.php';`
- Copiar el archivo `MiFIELLib.p12` en la carpeta raíz del proyecto.
- Dentro del archivo `{[ROOTDIR]}/application/config/constants.php` crear las siguientes constantes.
    ```code
    /* MIFIEL CONSTANTS */
    defined('MIFIEL_URL') OR define('MIFIEL_URL', 'https://app-sandbox.mifiel.com');
    //defined('MIFIEL_URL') OR define('MIFIEL_URL', 'https://mifiel.com/api/v1/');
    defined('APIVERSION') OR define('APIVERSION', 'api/v1');
    defined('MIFIEL_APPID') OR define('MIFIEL_APPID', 'fd246f2b72217b0e618b2acd3f632a8535898c92');
    defined('MIFIEL_APPSECRET') OR define('MIFIEL_APPSECRET', 'FEXjovNhDbmPfEVvQOXmaSzZ8jOgfCH7qk10FLqMEwkXyMo+26eKdibJc8oo/V+zi1qsDj+wiibsVxc3G9J7pQ==');
    defined('STATIC_DOCUMMENTS_PATH') OR define('STATIC_DOCUMMENTS_PATH', './assets/files/');
    /* /MIFIEL CONSTANTS */
    ```
- Copiar el archivo `MiFIELLib.php` dentro de la carpeta `{[ROOTDIR]}/application/libraries`

## Métodos de la librería
---
A continuación se especifican y describen los métodos que expone la librería para su uso.

| Método | Descripción |
| ------ | ------ |
| documents | Obtiene la lista de documentos |
| document | Obtiene documento por su identificador |
| createDocument | Genera un documento |
| deleteDocument | Elimina documento |
| certificates | Obtiene la lista de certificados |
| certificate | Obtiene certificado por su identificador |
| saveCertificate | Guardar un certficado |
| deleteCertificate | Elimina un certficado |

## Descripción de métodos
---
### documents
Método para consultar la lista completa de documentos generados idependietemente en el estatus en el que se encuentre.

**Implementación**
```code
    //cargar librería
    $this->load->library('MiFIELLib'); 
    
    //llamada al método
    $this->mifiellib->documents();
```

**Respuesta**
Leer documentación "Documento" en la seccón de Modelos. [ [ Modelo de documento ](#documento) ]

### document
Método para consultar un documento por su identificador único.

**Parametro de entrada**
| Campo	| Tipo | Opcional/Oligatorio | Descripción |
| ------ | ------ | ------ | ------ |
| id | String  | Obligatorio  | Identificador único del documento |

**Implementación**
```code
    //cargar librería
    $this->load->library('MiFIELLib'); 
    
    //llamada al método
    $this->mifiellib->document($id);
    
    //ejemplo
    $this->mifiellib->document('542fd8cd-f960-4963-8805-77c0be2cf52e');
```

**Respuesta**
Leer documentación "Documento" en la seccón de Modelos. [ [ Modelo de documento ](#documento) ]

### createDocument
Método para crear un documento para firmar pasando un archivo PDF.

**Modelo de entrada**
Leer documentación "CreaDocumento" en la seccón de Modelos. [ [ Modelo de crear documento ](#creadocumento) ]

**Implementación**
```code
    //cargar librería
    $this->load->library('MiFIELLib'); 
    
    //generación de modelo de entrada
    $modelSignature = [
		'file_path' => 'path/to/my-file.pdf',
		'signatories' => [
            [ 
              'name' => 'Signer 1', 
              'email' => 'signer1@email.com', 
              'tax_id' =>  'AAA010101AAA' 
            ]
        ],
		'external_id' => 'id_ref_1',
		'send_invites' => 0,
		'send_mail' => 0
	];
    //llamada al método
    $documentId = $this->mifiellib->createDocument($modelSignature);
```

**Respuesta**
Leer documentación "Documento" en la seccón de Modelos. [ [ Modelo de documento ](#documento) ]

### deleteDocument
Método para eliminar un documento espefícico.

**Parametro de entrada**
| Campo	| Tipo | Opcional/Oligatorio | Descripción |
| ------ | ------ | ------ | ------ |
| id | String  | Obligatorio  | Identificador único del documento |

**Implementación**
```code
    //cargar librería
    $this->load->library('MiFIELLib'); 
    
    //llamada al método
    $this->mifiellib->deleteDocument($id);
    
    //ejemplo
    $this->mifiellib->deleteDocument('487788fc-0be4-42ae-9a05-5ec8a38fff7f');
```

**Respuesta**
Sin respuesta de retorno

### certificates
Método para consultar la lista completa de certificados registrados.

**Implementación**
```code
    //cargar librería
    $this->load->library('MiFIELLib'); 
    
    //llamada al método
    $this->mifiellib->certificates();
```
**Respuesta**
Leer documentación "Certificado" en la seccón de Modelos. [ [ Modelo de certificado ](#certificado) ]

### certificate
Método para consultar un certificado por su identificador único.

**Parametro de entrada**
| Campo	| Tipo | Opcional/Oligatorio | Descripción |
| ------ | ------ | ------ | ------ |
| id | String  | Obligatorio  | Identificador único del documento |

**Implementación**
```code
    //cargar librería
    $this->load->library('MiFIELLib'); 
    
    //llamada al método
    $this->mifiellib->certificate($id);
    
    //ejemplo
    $this->mifiellib->certificate('fc271411-0806-4643-8465-65579c3f1957');
```
**Respuesta**
Leer documentación "Certificado" en la seccón de Modelos. [ [ Modelo de certificado ](#certificado) ]

### saveCertificate
Método para cargar y guardar certificado de un firmante.

**Parametro de entrada**
| Campo	| Tipo | Opcional/Oligatorio | Descripción |
| ------ | ------ | ------ | ------ |
| file | String  | Obligatorio  |  `.cer` Archivo de su FIEL |

**Implementación**
```code
    //cargar librería
    $this->load->library('MiFIELLib'); 
    
    //llamada al método
    $this->mifiellib->saveCertificate('path/to/my-certificate.cer');
```
**Respuesta**
Leer documentación "Certificado" en la seccón de Modelos. [ [ Modelo de certificado ](#certificado) ]

### deleteCertificate
Método para cargar y guardar certificado de un firmante.

**Parametro de entrada**
| Campo	| Tipo | Opcional/Oligatorio | Descripción |
| ------ | ------ | ------ | ------ |
| id | String  | Obligatorio  | Identificador único del documento |

**Implementación**
```code
    //cargar librería
    $this->load->library('MiFIELLib'); 
    
    //llamada al método
    $this->mifiellib->deleteCertificate($id);
    
    //ejemplo
    $this->mifiellib->certificate('fc271411-0806-4643-8465-65579c3f1666');
```
**Respuesta**
Sin respuesta de retorno

## Modelos
---
#### Documento
Contiene información sobre el archivo PDF que se está firmando
| Campo	| Tipo | Descripción |
| ------ | ------ | ------ |
| id | String	
| original_hash | String | Hash del documento original (sin firmar) |
| file_file_name | String | Nombre del archivo subido |
| signed_by_all | Boolean | `true` si todos los firmantes han firmado el documento |
| signed_at | Date | Marca de tiempo de la fecha de la firma (cuando se han recopilado todas las firmas) |
| already_signed | String[] | Personas que han firmado |
| has_not_signed | String[] | Personas que no han firmado |
| status | Array | [código, mensaje] `0: not signed, 1: signed` |
| owner | Object | El propietario del documento. El usuario que creó el documento. |
| callback_url | String | La URL de devolución de llamada que se publicará cuando todos firmen. |
| file | String | Ruta donde se puede descargar el documento original |
| file_signed | String | Ruta donde se puede descargar el archivo firmado |
| file_zipped | String | Ruta donde se pueden descargar el archivo y el archivo firmado en un archivo zip |
| signatures | Object[] | Matriz de un objeto de firma. Leer documentación "firmas" en la seccón de Modelos. [ [ Modelo de firmas ](#firmas) ] |
| external_id | String | Una identificación única para que pueda identificar el documento en la respuesta o recuperarlo |

#### Firmas
Contiene información sobre los firmantes que han firmado correctamente el documento.
| Campo	| Tipo | Descripción |
| ------ | ------ | ------ |
| id | String	
| email | String | Correo electrónico del firmante |
| signed | Boolean | `true` si está firmado |
| signed_at | Date | Marca de tiempo de la fecha de la firma |
| certificate_number | String | Número de certificado asignado por la autoridad certificadora (p. Ej., SAT) |
| tax_id | String | RFC del firmante |
| signature | String | Firma electrónica en el documento (en hexadecimal) |

#### CreaDocumento
Contiene información para la creación de un documento

| Campo	| Tipo | Opcional/Oligatorio | Descripción |
| ------ | ------ | ------ | ------ |
| file_path | String  | Obligatorio  | Archivo a firmar (el hash se extraerá automáticamente del archivo y se firmará |
| signatories | Object[]  | Obligatorio | Matriz de un objeto de firmante. Leer documentación "firmante" en la seccón de Modelos. [ [ Modelo de firmantes ](#firmante) ] |
| external_id | String | Opcional | Una identificación única para que pueda identificar el documento en la respuesta o recuperarlo |
| callback_url | String | Opcional | Una URL de devolución de llamada para publicar cuando se firme el documento |
| send_mail | String | Opcional | `1 o 0` define si se enviará correo electrónico a los firmantes |
| remind_every | Int | Opcional | Días para enviar recordatorios por correo electrónico |
| days_to_expire | Int | Opcional | Días antes de que la vigencia del documento expire |

#### Firmante
Contiene información sobre el firmante.
| Campo	| Tipo | Obligatorio/Opcional | Descripción |
| ------ | ------ | ------ | ------ |
| email | String | Obligatorio | Correo electrónico del firmante |
| name | String | Opcional | Correo electrónico del firmante |
| tax_id | String | Opcional | RFC del firmante |

#### Certificado
| Campo	| Tipo | Descripción |
| ------ | ------ | ------ |
| id | String | Identificador único del certificado. |
certificate_number
| type_of | String | Tipo de certificado utilizado (p. Ej., FIEL). |
| owner | String | Nombre del propietario según se define en el certificado. |
| tax_id | String | RFC (identificación fiscal) u otro identificador del propietario según se define en el certificado. |
| cer_hex | String | Certificado en hexadecimal |
| expires_at | Date | Fecha de vencimiento del Certificado |
| expired | Boolean | ´true´ si el certificado está vencido |
revoked | Boolean | ´true´ si el certificado está revocado |
revoked_at | Date | Marca de tiempo cuándo el certificado fué revocado |
days_to_expire | Int | Días para que el certificado expire |