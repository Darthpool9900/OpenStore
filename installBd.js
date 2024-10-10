const { execSync } = require('child_process');
const path = require('path');

// Caminho para o diretório sqlite
const sqlitePath = path.join(__dirname, 'resources', 'sqlite');

// Comando para adicionar ao PATH no Windows
const addPathCommand = `setx PATH "%PATH%;${sqlitePath}" /M`;

try {
    // Executa o comando para adicionar ao PATH
    execSync(addPathCommand);
    console.log(`O diretório ${sqlitePath} foi adicionado ao PATH com sucesso.`);
} catch (error) {
    console.error(`Erro ao adicionar ${sqlitePath} ao PATH:`, error);
}
