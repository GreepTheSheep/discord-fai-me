const Command = require('../structures/Command'),
    {MessageEmbed, CommandInteraction, SelectMenuInteraction, Message, MessageActionRow, MessageButton, MessageSelectMenu} = require('discord.js'),
    regionNamesInEnglish = new Intl.DisplayNames(['en'], { type: 'region' });

/**
 * Set the command here, it's what we'll type in the message
 * @type {string}
 */
exports.name = 'create';


/**
 * Set the description here, this is what will show up when you need help for the command
 * @type {string}
 */
exports.description = 'Start a new request to create a Debian ISO';


/**
 * Set the command arguments here, this is what will show up when you type the command
 * @type {Command.commandArgs[]}
 */
exports.args = [
    {
        name: 'suite',
        description: 'Debian Version Used',
        type: 'string',
        required: true,
        choices: [
            {
                name: 'stretch (9)',
                value: 'stretch'
            },
            {
                name: 'buster (10)',
                value: 'buster'
            },
            {
                name: 'bullseye (11)',
                value: 'bullseye'
            }
        ]
    },
    {
        name: 'username',
        description: 'Default user name of the OS',
        type: 'string',
        required: true
    },
    {
        name: 'userpw',
        description: 'Password of the default user',
        type: 'string',
        required: true
    },
    {
        name: 'desktop',
        description: 'Desktop environement Used',
        type: 'string',
        required: false,
        choices: [
            {
                name: 'No Desktop environement',
                value: 'none'
            },
            {
                name: 'LXDE',
                value: 'LXDE'
            },
            {
                name: 'KDE',
                value: 'KDE'
            },
            {
                name: 'Mate',
                value: 'MATE'
            },
            {
                name: 'Cinnamon',
                value: 'CINNAMON'
            },
            {
                name: 'Xfce',
                value: 'XFCE'
            },
            {
                name: 'Gnome',
                value: 'GNOME'
            }
        ]
    },
    {
        name: 'keyboard',
        description: 'Keyboard layout Used',
        type: 'string',
        required: false,
        choices: [
            {
                name: regionNamesInEnglish.of('gb'.toUpperCase()),
                value: 'gb'
            },
            {
                name: regionNamesInEnglish.of('us'.toUpperCase()),
                value: 'us'
            },
            {
                name: regionNamesInEnglish.of('fr'.toUpperCase()),
                value: 'fr'
            },
            {
                name: regionNamesInEnglish.of('de'.toUpperCase()),
                value: 'de'
            },
            {
                name: regionNamesInEnglish.of('pl'.toUpperCase()),
                value: 'pl'
            },
            {
                name: regionNamesInEnglish.of('pt'.toUpperCase()),
                value: 'pt'
            },
            {
                name: regionNamesInEnglish.of('ru'.toUpperCase()),
                value: 'ru'
            },
            {
                name: regionNamesInEnglish.of('es'.toUpperCase()),
                value: 'es'
            },
            {
                name: regionNamesInEnglish.of('tr'.toUpperCase()),
                value: 'tr'
            },
            {
                name: regionNamesInEnglish.of('cn'.toUpperCase()),
                value: 'cn'
            },
            {
                name: regionNamesInEnglish.of('tw'.toUpperCase()),
                value: 'tw'
            },
            {
                name: regionNamesInEnglish.of('hi'.toUpperCase()),
                value: 'hi'
            },
            {
                name: regionNamesInEnglish.of('ja'.toUpperCase()),
                value: 'ja'
            }
        ]
    },
    {
        name: 'rootpw',
        description: 'Password of the root user',
        type: 'string',
        required: false
    },
    {
        name: 'email',
        description: 'Email address to get alert when the generation is finished',
        type: 'string',
        required: false
    },
    {
        name: 'github',
        description: 'Github user for ssh root access',
        type: 'string',
        required: false
    },
    {
        name: 'addpkgs',
        description: 'List of packages space separated',
        type: 'string',
        required: false
    },
    {
        name: 'partition',
        description: 'Partition System Used',
        type: 'string',
        required: false,
        choices: [
            {
                name: 'Only one partition',
                value: 'ONE'
            },
            {
                name: 'Only one partition (LVM)',
                value: 'ONE_LVM'
            },
            {
                name: '/home partition separated',
                value: 'HOME'
            },
            {
                name: '/home partition separated (LVM)',
                value: 'HOME_LVM'
            }
        ]
    },
    {
        name: 'backports',
        description: 'Add Backports to your OS',
        type: 'boolean',
        required: false
    },
    {
        name: 'debian_devel',
        description: 'Add Debian Dev Tools to your OS',
        type: 'boolean',
        required: false
    },
    {
        name: 'webserver',
        description: 'Add Apache2 Web Server to your OS',
        type: 'boolean',
        required: false
    },
    {
        name: 'printserver',
        description: 'Add Print Server to your OS',
        type: 'boolean',
        required: false
    },
    {
        name: 'ssh_server',
        description: 'Add OpenSSH Server to your OS',
        type: 'boolean',
        required: false
    },
    {
        name: 'standard',
        description: 'Add Standard repo sources to your OS',
        type: 'boolean',
        required: false
    },
    {
        name: 'nonfree',
        description: 'Add NonFree repo sources to your OS',
        type: 'boolean',
        required: false
    },
    {
        name: 'private',
        description: 'Only you will see the link, and not others in this channel',
        type: 'boolean',
        required: false
    }
];

/**
 * Set the usage here, this is what will show up when you type the command
 * This part is executed as slash command
 * @param {CommandInteraction} interaction
 * @param {Command[]} commands
 */
exports.execute = async (interaction, commands) => {
    interaction.reply({
        content: 'WIP',
        ephemeral: interaction.options.getBoolean('private')
    });
};