@echo off

REM Função para adicionar um diretório ao PATH do Windows
:add_to_path
set "dir_to_add=%~1"
if exist "%dir_to_add%" (
    setx PATH "%PATH%;%dir_to_add%" /M
    if %errorlevel% neq 0 (
        echo Erro: Não foi possível adicionar "%dir_to_add%" ao PATH.
        exit /b 1
    )
    echo "%dir_to_add%" foi adicionado ao PATH com sucesso.
) else (
    echo Erro: O diretório "%dir_to_add%" não existe.
    exit /b 1
)

REM Caminho para a pasta sqlite
set "sqlite_path=%~dp0\resources\sqlite"

REM Adiciona a pasta sqlite ao PATH
call :add_to_path "%sqlite_path%"

exit /b 0
