const Command = require('../structures/Command'),
    fetch = require('node-fetch'),
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
        description: 'Password of the default user. If not set, a password will be generated',
        type: 'string',
        required: false
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

    await interaction.deferReply({
        ephemeral: interaction.options.getBoolean('private')
    });

    const FAImeBaseUrl = "https://fai-project.org/cgi/faime.cgi?";
    let URLParams = new URLSearchParams();
    URLParams.set("type", "install");

    this.args.forEach(args=>{
        if (args.type == "string" && interaction.options.getString(args.name) != null) {
            URLParams.set(args.name, encodeURI(interaction.options.getString(args.name)));
        }
    });

    // required params

    if (URLParams.get("partition") == null)
        URLParams.set("partition", this.args.find(a=>a.name=="partition").choices[0].value);

    if (URLParams.get("desktop") == null || interaction.options.getString("desktop") == "none")
        URLParams.set("desktop", "");

    if (URLParams.get("keyboard") == null)
        URLParams.set("keyboard", this.args.find(a=>a.name=="keyboard").choices[0].value);

    if (URLParams.get("suite") == null)
        URLParams.set("suite", this.args.find(a=>a.name=="suite").choices[0].value);

    // boolean values

    if (interaction.options.getBoolean("backports"))
        URLParams.set("cl1", "BACKPORTS");

    if (interaction.options.getBoolean("debian_devel"))
        URLParams.set("cl2", "DEBIAN_DEVEL");

    if (interaction.options.getBoolean("webserver"))
        URLParams.set("cl3", "WEBSERVER");

    if (interaction.options.getBoolean("printserver"))
        URLParams.set("cl4", "PRINTSERVER");

    if (interaction.options.getBoolean("ssh_server"))
        URLParams.set("cl5", "SSH_SERVER");

    if (interaction.options.getBoolean("standard"))
        URLParams.set("cl6", "STANDARD");

    if (interaction.options.getBoolean("nonfree"))
        URLParams.set("cl7", "NONFREE");

    // Start request

    /** @type {string} */
    let res = await fetch(FAImeBaseUrl+URLParams.toString()).then(req=>req.text());
    console.log(res);

    let rawCommandsArgs = {};
    interaction.options.data.forEach(a=>{
        rawCommandsArgs[a.name] = a.value;
    });

    if (res.match(/([0-9A-Z,. ]*)\n<\/pre>/gmi)) {
        let err = res.replace(/[\s\S]+?(?="\n\n)"\n\n([0-9A-Z,. ]*)\n<\/pre>/gmi, "$1");
        console.error(interaction.member.user.tag + " requested create\n", rawCommandsArgs, "\n", err);
        interaction.editReply({
            content: err
        });
    } else {
        let url = res.match(/url=http[s]?:\/\/fai-project.org\/myimages\/[A-Z0-9]*/gmi)[0].replace(/url=/gm, "");

        console.log(interaction.member.user.tag + " requested create\n", rawCommandsArgs, "\n", url);

        interaction.editReply({
            content: "Your Image is being created, check this page for more information: " + url
        });
    }
};