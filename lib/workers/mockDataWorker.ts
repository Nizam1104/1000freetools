// Define types for better TypeScript support
interface Field {
    name: string;
    type?: string;
    options?: any[];
    blankPercentage?: number;
}

interface MessageData {
    fields: Field[];
    rowCount: number;
    format: string;
}

import { faker as _faker } from '@faker-js/faker';

// Helper function to escape XML special characters
const escapeXML = (str: string | number | boolean): string => {
    const stringValue = String(str);
    return stringValue
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

// Helper function to escape SQL special characters
const escapeSQL = (str: string | number | boolean): string => {
    const stringValue = String(str);
    return stringValue.replace(/'/g, "''");
}

// Helper function to escape HTML special characters
const escapeHTML = (str: string | number | boolean): string => {
    const stringValue = String(str);
    return stringValue
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

// Dynamic imports for lazy loading
// let faker: any = null
let generateExcelFromFields: any = null

// Load faker library only when needed
// const loadFaker = async () => {
//     if (!faker) {
//         const fakerModule = await import('@faker-js/faker')
//         faker = fakerModule.faker
//     }
//     return faker
// }

// Load Excel generator only when needed
const loadExcelGenerator = async () => {
    if (!generateExcelFromFields) {
        const excelModule = await import('./excelGenerator')
        generateExcelFromFields = excelModule.generateExcelFromFields
    }
    return generateExcelFromFields
}

// Mock data generation functions for different data types
const generateMockValue = async (field: Field) => {
    const { type, options } = field

    // Handle blank percentage
    if (Math.random() * 100 < (field.blankPercentage || 0)) {
        return ''
    }

    // Load faker if not already loaded
    // const _faker = await loadFaker()

    switch (type) {
        case 'string':
            return _faker.lorem.word()

        case 'number':
            return _faker.number.int({ min: 1, max: 1000 })

        case 'email':
            return _faker.internet.email()

        case 'age':
            return _faker.number.int({ min: 1, max: 100 })

        case 'phone':
            return _faker.phone.number()

        case 'date':
            return _faker.date.past().toISOString().split('T')[0]

        case 'boolean':
            return _faker.datatype.boolean()

        case 'uuid':
            return _faker.string.uuid()

        case 'name':
            return _faker.person.fullName()

        case 'address':
            return _faker.location.streetAddress()

        case 'company':
            return _faker.company.name()

        case 'job_title':
            return _faker.person.jobTitle()

        case 'url':
            return _faker.internet.url()

        case 'username':
            return _faker.internet.username()

        case 'password':
            return _faker.internet.password()

        case 'zip_code':
            return _faker.location.zipCode()

        case 'city':
            return _faker.location.city()

        case 'state':
            return _faker.location.state()

        case 'country':
            return _faker.location.country()

        case 'latitude':
            return _faker.location.latitude().toString()

        case 'longitude':
            return _faker.location.longitude().toString()

        case 'timezone':
            return _faker.location.timeZone()

        case 'color':
            return _faker.color.human()

        case 'hex_color':
            return _faker.color.rgb()

        case 'credit_card':
            return _faker.finance.creditCardNumber()

        case 'currency':
            return _faker.finance.currencyName()

        case 'iban':
            return _faker.finance.iban()

        case 'bic':
            return _faker.finance.bic()

        case 'bitcoin_address':
            return _faker.finance.bitcoinAddress()

        case 'transaction_id':
            return _faker.finance.transactionType()

        case 'avatar_url':
            return _faker.image.avatar()

        case 'ip_address':
            return _faker.internet.ip()

        case 'mac_address':
            return _faker.internet.mac()

        case 'user_agent':
            return _faker.internet.userAgent()

        case 'word':
            return _faker.lorem.word()

        case 'sentence':
            return _faker.lorem.sentence()

        case 'paragraph':
            return _faker.lorem.paragraph()

        case 'text':
            return _faker.lorem.paragraphs(2)

        case 'lorem_ipsum':
            return _faker.lorem.text()

        case 'product_name':
            return _faker.commerce.productName()

        case 'product_description':
            return _faker.commerce.productDescription()

        case 'price':
            return _faker.commerce.price()

        case 'currency':
            return _faker.finance.currencyCode()

        case 'stock_symbol':
            return _faker.finance.currencyCode() // Fallback since stockSymbol might not be available

        case 'department':
            return _faker.commerce.department()

        case 'industry':
            return _faker.company.buzzPhrase()

        case 'building_number':
            return _faker.location.buildingNumber()

        case 'secondary_address':
            return _faker.location.secondaryAddress()

        case 'county':
            return _faker.location.county()

        case 'timezone':
            return _faker.location.timeZone()

        case 'locale':
            return 'en-US' // Fallback since locale might not be available

        case 'language':
            return _faker.location.language()

        case 'file_name':
            return _faker.system.fileName()

        case 'file_extension':
            return _faker.system.fileExt()

        case 'mime_type':
            return _faker.system.mimeType()

        case 'direction':
            return _faker.location.direction()

        case 'cardinal_direction':
            return _faker.location.cardinalDirection()

        case 'ordinal_direction':
            return _faker.location.ordinalDirection()

        case 'vehicle_type':
            return _faker.vehicle.type()

        case 'vehicle_vin':
            return _faker.vehicle.vin()

        case 'vehicle_model':
            return _faker.vehicle.model()

        case 'vehicle_color':
            return _faker.vehicle.color()

        case 'airline':
            return _faker.airline.airline().name

        case 'airport_code':
            return _faker.airline.airport().iataCode

        case 'flight_number':
            return _faker.airline.flightNumber()

        case 'blood_type':
            return _faker.helpers.arrayElement(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])

        case 'health_condition':
            return _faker.helpers.arrayElement(['Diabetes', 'Hypertension', 'Asthma', 'Arthritis', 'Depression'])

        case 'medication':
            return _faker.helpers.arrayElement(['Aspirin', 'Ibuprofen', 'Paracetamol', 'Amoxicillin', 'Lisinopril'])

        case 'doctor_name':
            return _faker.person.fullName()

        case 'hospital_name':
            return _faker.company.name() + ' Hospital'

        case 'isbn':
            return '978-' + _faker.number.int({ min: 0, max: 9999999999 }).toString().padStart(10, '0')

        case 'book_title':
            return _faker.book.title()

        case 'book_author':
            return _faker.book.author()

        case 'book_genre':
            return _faker.book.genre()

        case 'music_genre':
            return _faker.music.genre()

        case 'song_title':
            return _faker.music.songName()

        case 'artist_name':
            return _faker.music.artist()

        case 'album_name':
            return _faker.music.album()

        case 'instrument':
            return _faker.helpers.arrayElement(['Guitar', 'Piano', 'Drums', 'Bass', 'Violin', 'Saxophone', 'Trumpet', 'Flute'])

        case 'movie_title':
            return _faker.lorem.words(3)

        case 'movie_genre':
            return _faker.helpers.arrayElement(['Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Sci-Fi', 'Thriller'])

        case 'director_name':
            return _faker.person.fullName()

        case 'actor_name':
            return _faker.person.fullName()

        case 'tv_show':
            return _faker.lorem.words(3)

        case 'tv_genre':
            return _faker.helpers.arrayElement(['Sitcom', 'Drama', 'Reality', 'Documentary', 'News', 'Sports'])

        case 'brand_name':
            return _faker.company.name()

        case 'product_category':
            return _faker.commerce.department()

        case 'material':
            return _faker.commerce.productMaterial()

        case 'unit_of_measurement':
            return _faker.science.unit().symbol

        case 'database_column':
            return _faker.database.column()

        case 'database_type':
            return _faker.database.type()

        case 'programming_language':
            return 'JavaScript' // Fallback since computer programmingLanguage might not be available

        case 'file_path':
            return _faker.system.filePath()

        case 'directory_path':
            return _faker.system.directoryPath()

        case 'mimeType':
            return _faker.system.mimeType()

        case 'semver':
            return _faker.system.semver()

        case 'git_commit_hash':
            return _faker.git.commitSha()

        case 'git_branch':
            return _faker.git.branch()

        case 'firstName':
            return _faker.person.firstName()

        case 'lastName':
            return _faker.person.lastName()

        case 'gender':
            return _faker.person.sex()

        case 'prefix':
            return _faker.person.prefix()

        case 'suffix':
            return _faker.person.suffix()

        case 'password':
            return _faker.internet.password()

        case 'ip_address_v6':
            return _faker.internet.ipv6()

        case 'avatar_url':
            return _faker.image.avatar()

        case 'image_url':
            return _faker.image.url()

        case 'street_name':
            return _faker.location.street()

        case 'state_abbr':
            return _faker.location.state({ abbreviated: true })

        case 'tld':
            return _faker.internet.domainSuffix()

        case 'buzzword':
            return _faker.company.buzzPhrase()

        case 'catch_phrase':
            return _faker.company.catchPhrase()

        case 'slogan':
            return _faker.company.buzzPhrase()

        case 'isbn':
            return _faker.commerce.isbn()

        case 'bank_name':
            return _faker.finance.accountName()

        case 'routing_number':
            return _faker.finance.routingNumber()

        case 'ethereum_address':
            return _faker.finance.ethereumAddress()

        case 'datetime':
            return _faker.date.anytime().toISOString()

        case 'time':
            return _faker.date.recent().toLocaleTimeString()

        case 'date_past':
            return _faker.date.past().toISOString().split('T')[0]

        case 'date_future':
            return _faker.date.future().toISOString().split('T')[0]

        case 'birthdate':
            return _faker.date.birthdate({ mode: 'age', min: 18, max: 65 }).toISOString().split('T')[0]

        case 'hacker_phrase':
            return _faker.hacker.phrase()

        case 'character_sequence':
            return _faker.string.alphanumeric(10)

        case 'digits':
            return _faker.string.numeric(10)

        case 'hexadecimal':
            return _faker.string.hexadecimal({ length: 10 })

        case 'template_string':
            return `{{${_faker.lorem.word()}}}`

        case 'md5':
            return _faker.string.alphanumeric({ casing: 'lower', length: 32 })

        case 'sha1':
            return _faker.string.alphanumeric({ casing: 'lower', length: 40 })

        case 'artist_name':
            return _faker.person.fullName()

        case 'album_name':
            return _faker.music.album()

        case 'animal_type':
            return _faker.animal.type()

        case 'animal_name':
            return _faker.animal.cat() // Using cat as a specific animal example

        case 'hex_color':
            return '#' + _faker.string.hexadecimal({ length: 6, casing: 'lower' })

        case 'rgb_color':
            return `rgb(${_faker.number.int({ min: 0, max: 255 })}, ${_faker.number.int({ min: 0, max: 255 })}, ${_faker.number.int({ min: 0, max: 255 })})`

        case 'rgba_color':
            return `rgba(${_faker.number.int({ min: 0, max: 255 })}, ${_faker.number.int({ min: 0, max: 255 })}, ${_faker.number.int({ min: 0, max: 255 })}, ${_faker.number.float({ min: 0, max: 1 }).toFixed(2)})`

        case 'song_title':
            return _faker.music.songName()

        case 'credit_card_type':
            return _faker.helpers.arrayElement(['Visa', 'MasterCard', 'American Express', 'Discover'])

        case 'bitcoin_address':
            return _faker.finance.bitcoinAddress()

        case 'vehicle_vin':
            return _faker.vehicle.vin()

        case 'vehicle_color':
            return _faker.vehicle.color()

        case 'vehicle_model':
            return _faker.vehicle.model()

        case 'vehicle_manufacturer':
            return _faker.vehicle.manufacturer()

        case 'music_genre':
            return _faker.music.genre()

        case 'deployment_environment':
            return _faker.helpers.arrayElement(['development', 'staging', 'production'])

        case 'error_message':
            return _faker.helpers.arrayElement(['Internal server error', 'Not found', 'Unauthorized', 'Bad request'])

        case 'http_method':
            return _faker.helpers.arrayElement(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'])

        case 'http_status_code':
            return _faker.internet.httpStatusCode().toString()

        case 'content_type':
            return _faker.system.mimeType()

        case 'api_endpoint':
            return _faker.internet.url()

        case 'json_key':
            return _faker.lorem.word()

        case 'json_value':
            return _faker.lorem.word()

        case 'css_property':
            return _faker.helpers.arrayElement(['color', 'background', 'margin', 'padding', 'font-size'])

        case 'css_value':
            return _faker.helpers.arrayElement(['red', 'blue', '10px', '20px', '1rem'])

        case 'html_element':
            return _faker.helpers.arrayElement(['div', 'span', 'p', 'h1', 'h2', 'button'])

        case 'html_attribute':
            return _faker.helpers.arrayElement(['class', 'id', 'href', 'src', 'alt'])

        case 'html_tag':
            return _faker.helpers.arrayElement(['div', 'span', 'p', 'h1', 'h2', 'button'])

        case 'css_class':
            return _faker.lorem.word()

        case 'css_selector':
            return _faker.helpers.arrayElement(['.class', '#id', 'element', '.parent .child'])

        case 'javascript_framework':
            return _faker.helpers.arrayElement(['React', 'Vue', 'Angular', 'Svelte', 'Next.js'])

        case 'database_name':
            return _faker.database.column()

        case 'table_name':
            return _faker.database.column()

        case 'column_name':
            return _faker.database.column()

        case 'sql_query':
            return 'SELECT * FROM table'

        case 'regex_pattern':
            return _faker.helpers.arrayElement(['[a-z]+', '\\d+', '[A-Z][a-z]+'])

        case 'validation_rule':
            return _faker.helpers.arrayElement(['required', 'email', 'minLength', 'maxLength'])

        case 'date_format':
            return _faker.helpers.arrayElement(['YYYY-MM-DD', 'MM/DD/YYYY', 'DD/MM/YYYY'])

        case 'time_format':
            return _faker.helpers.arrayElement(['HH:mm', 'hh:mm A', 'HH:mm:ss'])

        case 'timestamp':
            return new Date().toISOString()

        case 'duration':
            return _faker.helpers.arrayElement(['1h', '30m', '2d', '1w'])

        case 'frequency':
            return _faker.helpers.arrayElement(['daily', 'weekly', 'monthly', 'yearly'])

        case 'percentage':
            return _faker.number.int({ min: 0, max: 100 }).toString()

        case 'ratio':
            return _faker.number.int({ min: 1, max: 10 }) + ':' + _faker.number.int({ min: 1, max: 10 })

        case 'scale':
            return _faker.helpers.arrayElement(['small', 'medium', 'large', 'x-large'])

        case 'temperature':
            return _faker.number.int({ min: -10, max: 40 }).toString() + '°C'

        case 'weight':
            return _faker.number.int({ min: 1, max: 200 }).toString() + 'kg'

        case 'length':
            return _faker.number.int({ min: 1, max: 100 }).toString() + 'cm'

        case 'volume':
            return _faker.number.int({ min: 1, max: 1000 }).toString() + 'L'

        case 'speed':
            return _faker.number.int({ min: 1, max: 200 }).toString() + 'km/h'

        case 'pressure':
            return _faker.number.int({ min: 980, max: 1050 }).toString() + 'hPa'

        case 'energy':
            return _faker.number.int({ min: 1, max: 1000 }).toString() + 'kWh'

        case 'power':
            return _faker.number.int({ min: 1, max: 1000 }).toString() + 'W'

        case 'voltage':
            return _faker.number.int({ min: 110, max: 240 }).toString() + 'V'

        case 'current':
            return _faker.number.int({ min: 1, max: 100 }).toString() + 'A'

        case 'resistance':
            return _faker.number.int({ min: 1, max: 1000 }).toString() + 'Ω'

        case 'data_unit':
            return _faker.helpers.arrayElement(['bytes', 'KB', 'MB', 'GB', 'TB'])

        case 'storage_unit':
            return _faker.helpers.arrayElement(['bytes', 'KB', 'MB', 'GB', 'TB'])

        case 'memory_unit':
            return _faker.helpers.arrayElement(['bytes', 'KB', 'MB', 'GB'])

        case 'network_protocol':
            return _faker.helpers.arrayElement(['HTTP', 'HTTPS', 'FTP', 'SSH', 'TCP', 'UDP'])

        case 'port_number':
            return _faker.number.int({ min: 1, max: 65535 }).toString()

        case 'domain_name':
            return _faker.internet.domainName()

        case 'subdomain':
            return _faker.internet.domainWord()

        case 'email_provider':
            return _faker.helpers.arrayElement(['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'])

        case 'social_media_platform':
            return _faker.helpers.arrayElement(['Facebook', 'Twitter', 'Instagram', 'LinkedIn', 'TikTok'])

        case 'hashtag':
            return '#' + _faker.lorem.word()

        case 'emoji':
            return _faker.internet.emoji()

        case 'phone_area_code':
            return _faker.number.int({ min: 200, max: 999 }).toString()

        case 'phone_country_code':
            return '+' + _faker.number.int({ min: 1, max: 99 })

        case 'time_zone_abbreviation':
            return _faker.location.timeZone()

        case 'currency_code':
            return _faker.finance.currencyCode()

        case 'currency_symbol':
            return _faker.finance.currencySymbol()

        case 'country_code':
            return _faker.location.countryCode()

        case 'language_code':
            return _faker.helpers.arrayElement(['en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'ja', 'zh', 'ar'])

        case 'locale_code':
            return 'en-US'

        case 'select':
            if (options && options.length > 0) {
                return options[Math.floor(Math.random() * options.length)]
            }
            return ''

        default:
            return _faker.lorem.word()
    }
}

// Generate CSV header
const generateCSVHeader = (fields: Field[]) => {
    return fields.map((field: Field) => field.name).join(',')
}

// Generate CSV row
const generateCSVRow = async (fields: Field[]) => {
    const rowValues = []
    for (const field of fields) {
        const value = await generateMockValue(field)
        // Escape quotes and wrap in quotes if contains comma or quotes
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
            rowValues.push(`"${value.replace(/"/g, '""')}"`)
        } else {
            rowValues.push(value)
        }
    }
    return rowValues.join(',')
}

// Generate JSON object
const generateJSONObject = async (fields: Field[]) => {
    const obj: any = {}
    for (const field of fields) {
        obj[field.name] = await generateMockValue(field)
    }
    return obj
}

// Generate XML row
const generateXMLRow = async (fields: Field[]) => {
    let row = '  <row>\n'
    for (const field of fields) {
        const value = await generateMockValue(field)
        const escapedValue = escapeXML(value)
        const safeFieldName = field.name.replace(/[^a-zA-Z0-9_]/g, '_')
        row += `    <${safeFieldName}>${escapedValue}</${safeFieldName}>\n`
    }
    row += '  </row>'
    return row
}

// Generate SQL INSERT statement
const generateSQLRow = async (fields: Field[]) => {
    const values: string[] = []
    for (const field of fields) {
        const value = await generateMockValue(field)
        if (value === '' || value === null || value === undefined) {
            values.push('NULL')
        } else if (typeof value === 'number' || typeof value === 'boolean') {
            values.push(String(value))
        } else {
            values.push(`'${escapeSQL(value)}'`)
        }
    }
    return values
}

// Generate HTML table row
const generateHTMLRow = async (fields: Field[]) => {
    let row = '    <tr>\n'
    for (const field of fields) {
        const value = await generateMockValue(field)
        const escapedValue = escapeHTML(value)
        row += `      <td>${escapedValue}</td>\n`
    }
    row += '    </tr>'
    return row
}

// Handle messages from main thread
self.onmessage = async (event: MessageEvent<MessageData>) => {
    const { fields, rowCount, format } = event.data

    try {
        let result: string | Blob = ''
        let filename = ''

        if (format === 'csv') {
            // Generate CSV
            const header = generateCSVHeader(fields)
            const rows: string[] = []

            for (let i = 0; i < rowCount; i++) {
                rows.push(await generateCSVRow(fields))
            }

            result = [header, ...rows].join('\n')
            filename = 'mock_data.csv'
        } else if (format === 'json') {
            // Generate JSON
            const objects: any[] = []

            for (let i = 0; i < rowCount; i++) {
                objects.push(await generateJSONObject(fields))
            }

            result = JSON.stringify(objects, null, 2)
            filename = 'mock_data.json'
        } else if (format === 'xml') {
            // Generate XML
            const rows: string[] = []

            for (let i = 0; i < rowCount; i++) {
                rows.push(await generateXMLRow(fields))
            }

            result = `<?xml version="1.0" encoding="UTF-8"?>\n<data>\n${rows.join('\n')}\n</data>`
            filename = 'mock_data.xml'
        } else if (format === 'sql') {
            // Generate SQL INSERT statements
            const tableName = 'mock_data'
            const columnNames = fields.map(f => `\`${f.name}\``).join(', ')
            const rows: string[] = []

            for (let i = 0; i < rowCount; i++) {
                const values = await generateSQLRow(fields)
                rows.push(`INSERT INTO ${tableName} (${columnNames}) VALUES (${values.join(', ')});`)
            }

            result = rows.join('\n')
            filename = 'mock_data.sql'
        } else if (format === 'html') {
            // Generate HTML table
            const headerCells = fields.map(f => `      <th>${escapeHTML(f.name)}</th>`).join('\n')
            const rows: string[] = []

            for (let i = 0; i < rowCount; i++) {
                rows.push(await generateHTMLRow(fields))
            }

            result = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mock Data</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    table { border-collapse: collapse; width: 100%; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    th { background-color: #4CAF50; color: white; }
    tr:nth-child(even) { background-color: #f2f2f2; }
  </style>
</head>
<body>
  <h1>Mock Data</h1>
  <table>
    <thead>
      <tr>
${headerCells}
      </tr>
    </thead>
    <tbody>
${rows.join('\n')}
    </tbody>
  </table>
</body>
</html>`
            filename = 'mock_data.html'
        } else if (format === 'excel') {
            // Generate Excel
            const objects: any[] = []

            for (let i = 0; i < rowCount; i++) {
                objects.push(await generateJSONObject(fields))
            }

            // Load Excel generator only when needed
            const excelGenerator = await loadExcelGenerator()
            result = excelGenerator(fields, objects)
            filename = 'mock_data.xlsx'
        } else {
            throw new Error('Unsupported format')
        }

        // Send result back to main thread
        self.postMessage({
            success: true,
            data: result,
            filename: filename,
            isBlob: format === 'excel'
        })

    } catch (error) {
        self.postMessage({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        })
    }
}


// Signal that the worker is ready
self.postMessage({ type: 'worker-ready' })

// Export to make this file a module and avoid global scope conflicts
export { }
