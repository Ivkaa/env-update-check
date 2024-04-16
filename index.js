const dotenv = require('dotenv')
const config = dotenv.config({ path: './.env.check' })
if (!config || !config.parsed) {
    throw new Error(`Couldn't load config, aborting: ` + config.error)
}

console.log(config.parsed)

const productionEnvironment = process.env.CI_COMMIT_REF_NAME === 'main'

try {
    for (const [key, value] of Object.entries(config.parsed)) {
        if (value === 'changed') {
            throw new Error(`Change ${key} env variable for deployment to be successful. You are deploying to staging or production environment.`)
        }
        if (value === 'staging-changed') {
            if (productionEnvironment) {
                throw new Error(`Change ${key} env variable for deployment to be successful. You are deploying to production environment.`)
            }
            continue
        }
        if (value !== 'unchanged') {
            throw new Error(`Value ${value} is not falling into allowed category "unchanged" | "changed" | "staging-changed"`)
        }
    }
} catch (error) {
    console.error(error.message)
    process.exit(1)
}
