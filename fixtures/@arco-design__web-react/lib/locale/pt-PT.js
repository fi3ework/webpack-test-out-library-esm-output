"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dayjs/locale/pt");
var Calendar = {
    formatYear: 'YYYY',
    formatMonth: 'MM/YYYY',
    monthBeforeYear: true,
    today: 'Hoje',
    view: {
        month: 'Mês',
        year: 'Ano',
        week: 'Semana',
        day: 'Dia',
    },
    month: {
        long: {
            January: 'Janeiro',
            February: 'Fevereiro',
            March: 'Março',
            April: 'Abril',
            May: 'Maio',
            June: 'Junho',
            July: 'Julho',
            August: 'Agosto',
            September: 'Setembro',
            October: 'Outubro',
            November: 'Novembro',
            December: 'Dezembro',
        },
        short: {
            January: 'Jan',
            February: 'Fev',
            March: 'Mar',
            April: 'Abr',
            May: 'Mai',
            June: 'Jun',
            July: 'Jul',
            August: 'Ago',
            September: 'Set',
            October: 'Out',
            November: 'Nov',
            December: 'Dez',
        },
    },
    week: {
        long: {
            self: 'Semana',
            monday: 'Segunda-feira',
            tuesday: 'Terça-feira',
            wednesday: 'Quarta-feira',
            thursday: 'Quinta-feira',
            friday: 'Sexta-feira',
            saturday: 'Sábado',
            sunday: 'Domingo',
        },
        short: {
            self: 'Semana',
            monday: 'Seg',
            tuesday: 'Ter',
            wednesday: 'Qua',
            thursday: 'Qui',
            friday: 'Sex',
            saturday: 'Sáb',
            sunday: 'Dom',
        },
    },
};
exports.default = {
    locale: 'pt-PT',
    dayjsLocale: 'pt',
    Calendar: Calendar,
    DatePicker: {
        Calendar: Calendar,
        placeholder: {
            date: 'Por favor, selecione a data',
            week: 'Por favor, selecione a semana',
            month: 'Por favor, selecione o mês',
            year: 'Por favor, selecione o ano',
            quarter: 'Por favor, selecione trimestre',
        },
        placeholders: {
            date: ['Data de início', 'Data de término'],
            week: ['Início da semana', 'Fim da semana'],
            month: ['Mês inicial', 'Mês final'],
            year: ['Ano inicial', 'Ano final'],
            quarter: ['Início do trimestre', 'Fim do trimestre'],
        },
        selectTime: 'Selecionar hora',
        selectDate: 'Selecionar data',
        today: 'Hoje',
        now: 'Agora',
        ok: 'Ok',
    },
    Drawer: {
        okText: 'Ok',
        cancelText: 'Cancelar',
    },
    Empty: {
        noData: 'Sem dados',
    },
    Modal: {
        okText: 'OK',
        cancelText: 'Cancelar',
    },
    Pagination: {
        goto: 'Vamos para',
        page: 'Página',
        countPerPage: ' / Página',
        total: 'Total: {0}',
        prev: 'Ir para a página anterior',
        next: 'Ir para a próxima página',
        currentPage: 'página {0}',
        prevSomePages: 'Anteriores {0} páginas',
        nextSomePages: 'Próximas {0} páginas',
        pageSize: 'tamanho da página',
    },
    Popconfirm: {
        okText: 'OK',
        cancelText: 'Cancelar',
    },
    Table: {
        okText: 'Ok',
        resetText: 'Redefinir',
        sortAscend: 'Clique para classificar em ordem crescente',
        sortDescend: 'Clique para classificar decrescente',
        cancelSort: 'Clique para cancelar a classificação',
    },
    TimePicker: {
        ok: 'OK',
        placeholder: 'Selecionar hora',
        placeholders: ['Hora de início', 'Hora de término'],
        now: 'Agora',
    },
    Progress: {
        success: 'Concluído',
        error: 'Falhou',
    },
    Upload: {
        start: 'Iniciar',
        cancel: 'Cancelar',
        delete: 'Excluir',
        reupload: 'Clique para tentar novamente',
        upload: 'Carregar',
        preview: 'Visualizar',
        drag: 'Clique ou arraste o arquivo para esta área para fazer upload',
        dragHover: 'Liberar para fazer upload',
        error: 'Erro ao carregar',
    },
    Typography: {
        copy: 'Copiar',
        copied: 'Copiado',
        edit: 'Editar',
        fold: 'dobrar',
        unfold: 'Desdobrar',
    },
    Transfer: {
        resetText: 'Redefinir',
    },
    ImagePreview: {
        fullScreen: 'Tela Cheia',
        rotateRight: 'Girar para a direita',
        rotateLeft: 'Girar para a esquerda',
        zoomIn: 'Ampliar',
        zoomOut: 'Afastar',
        originalSize: 'Tamanho original',
    },
};
