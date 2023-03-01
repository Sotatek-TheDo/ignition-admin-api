import {MigrationInterface, QueryRunner} from "typeorm";

export class DbMigrations1657529604628 implements MigrationInterface {
    name = 'DbMigrations1657529604628'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`default_token\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`network_id\` int NOT NULL,
                \`name\` varchar(255) NOT NULL,
                \`symbol\` varchar(255) NOT NULL,
                \`address\` varchar(255) NULL,
                \`decimal\` int NULL DEFAULT '18',
                \`is_enabled\` tinyint NOT NULL DEFAULT 1,
                \`logo\` varchar(255) NULL,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`file\` (
                \`id\` bigint NOT NULL AUTO_INCREMENT,
                \`uploader_id\` bigint NOT NULL,
                \`type\` varchar(255) NOT NULL,
                \`driver\` enum ('local', 's3', 'ipfs') NOT NULL DEFAULT 'local',
                \`path\` varchar(255) NOT NULL,
                \`s3_key\` varchar(255) NULL,
                \`bucket\` varchar(255) NULL,
                \`file_info\` text NULL,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                INDEX \`IDX_96519432f789c1624978f27ffc\` (\`uploader_id\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`hot_wallet\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`address\` varchar(255) NOT NULL,
                \`private_key\` varchar(255) NULL,
                \`is_enabled\` tinyint NOT NULL DEFAULT 1,
                \`kms_key_id\` int NULL,
                \`is_external\` tinyint NOT NULL DEFAULT 0,
                \`network_id\` int NOT NULL,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                INDEX \`IDX_0e4eebbc24a50661f403bdd2a0\` (\`address\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`kms_cmk\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`key_id\` varchar(255) NOT NULL,
                \`region\` varchar(255) NOT NULL,
                \`alias\` varchar(255) NOT NULL,
                \`arn\` varchar(255) NOT NULL,
                \`is_enabled\` tinyint NOT NULL DEFAULT 1,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`kms_key\` (
                \`id\` bigint NOT NULL AUTO_INCREMENT,
                \`kms_cmk_id\` int NOT NULL,
                \`data_key\` text NOT NULL,
                \`is_enabled\` tinyint NOT NULL DEFAULT 1,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`network\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`name\` varchar(255) NOT NULL,
                \`chain_id\` int NOT NULL,
                \`chain_name\` varchar(255) NOT NULL,
                \`rpc_endpoint\` varchar(255) NOT NULL,
                \`explorer_endpoint\` varchar(255) NOT NULL,
                \`block_time\` varchar(255) NOT NULL,
                \`native_token_symbol\` varchar(255) NOT NULL,
                \`native_token_decimal\` int NULL DEFAULT '18',
                \`block_confirmation\` int NOT NULL,
                \`is_enabled\` tinyint NOT NULL DEFAULT 1,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`nft_market_log\` (
                \`id\` bigint NOT NULL AUTO_INCREMENT,
                \`from_address\` varchar(255) NULL,
                \`to_address\` varchar(255) NULL,
                \`from_user_id\` int NULL,
                \`to_user_id\` int NULL,
                \`nftMarketId\` bigint NOT NULL,
                \`quantity\` int NOT NULL,
                \`pending_quantity\` int NOT NULL,
                \`success_quantity\` int NOT NULL DEFAULT '0',
                \`action\` enum (
                    'put_on_sale',
                    'remove_put_on_sale',
                    'buy',
                    'update_sale'
                ) NOT NULL,
                \`price\` varchar(255) NOT NULL,
                \`nftId\` bigint NOT NULL,
                \`currency\` varchar(255) NOT NULL,
                \`currency_address\` varchar(255) NOT NULL,
                \`status\` enum ('sale', 'sold') NOT NULL DEFAULT 'sale',
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                INDEX \`IDX_0eaacf84cbedc4160ad1d2f090\` (\`nftId\`),
                INDEX \`IDX_e9732ac91c86716359bbe4fdab\` (\`currency\`),
                INDEX \`IDX_91c0769b42d0542914062db6ad\` (\`currency_address\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`nft_market\` (
                \`id\` bigint NOT NULL AUTO_INCREMENT,
                \`quantity\` int NOT NULL,
                \`pending_quantity\` int NOT NULL,
                \`success_quantity\` int NOT NULL,
                \`status\` enum ('sale', 'sold') NOT NULL DEFAULT 'sale',
                \`currency\` varchar(255) NOT NULL,
                \`currency_address\` varchar(255) NOT NULL,
                \`currency_decimal\` int NULL DEFAULT '18',
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                INDEX \`IDX_7e72d034f6f4bd553e4d74896b\` (\`currency\`),
                INDEX \`IDX_351676a0f6893fe3dabd7c4f05\` (\`currency_address\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`nft_owner\` (
                \`id\` bigint NOT NULL AUTO_INCREMENT,
                \`network_id\` int NULL,
                \`nft_id\` int NOT NULL,
                \`user_id\` int NOT NULL,
                \`quantity\` int NOT NULL DEFAULT '0',
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`nft\` (
                \`id\` bigint NOT NULL AUTO_INCREMENT,
                \`network_id\` int NULL,
                \`name\` varchar(255) NOT NULL,
                \`description\` longtext NOT NULL,
                \`unlockable_content\` varchar(255) NOT NULL,
                \`no_copy\` int NULL DEFAULT '0',
                \`quantity\` int NULL DEFAULT '0',
                \`origin_image\` varchar(255) NULL,
                \`small_image\` varchar(255) NULL,
                \`large_image\` varchar(255) NULL,
                \`ipfs_json\` longtext NULL,
                \`raw_transaction\` longtext NULL,
                \`transaction_hash\` varchar(255) NOT NULL,
                \`contract_address\` varchar(255) NOT NULL,
                \`token_id\` varchar(255) NOT NULL,
                \`type\` enum (
                    'controller',
                    'controller_box',
                    'button',
                    'badge'
                ) NOT NULL,
                \`creator_user_id\` bigint NOT NULL,
                \`is_minted\` tinyint NOT NULL DEFAULT 0,
                \`is_sale\` tinyint NOT NULL DEFAULT 0,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`transaction\` (
                \`id\` bigint NOT NULL AUTO_INCREMENT,
                \`from_address\` varchar(255) NULL,
                \`to_address\` varchar(255) NULL,
                \`from_user_id\` int NULL,
                \`to_user_id\` int NULL,
                \`raw_transaction\` longtext NULL,
                \`signed_transaction\` longtext NULL,
                \`status\` enum ('pending', 'in_progress', 'success', 'failed') NOT NULL DEFAULT 'pending',
                \`tx_hash\` varchar(255) NULL,
                \`type\` enum (
                    'approve',
                    'nft_sale',
                    'ntf_farm',
                    'create_collection',
                    'deposit',
                    'withdraw'
                ) NOT NULL,
                \`retry_count\` int NULL DEFAULT '0',
                \`nft_id\` bigint NULL,
                \`block_number\` int NOT NULL,
                \`token_address\` varchar(255) NOT NULL,
                \`token_symbol\` varchar(255) NOT NULL,
                \`token_decimal\` varchar(255) NOT NULL,
                \`fee_symbol\` varchar(255) NOT NULL,
                \`fee_amount\` varchar(255) NOT NULL,
                \`data\` longtext NOT NULL,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`user_balance\` (
                \`id\` bigint NOT NULL AUTO_INCREMENT,
                \`user_id\` bigint NOT NULL,
                \`token_address\` varchar(255) NOT NULL,
                \`token_symbol\` varchar(255) NOT NULL,
                \`token_decimal\` int NULL DEFAULT '18',
                \`balance\` varchar(255) NOT NULL,
                \`available_balance\` varchar(255) NOT NULL,
                \`is_enabled\` tinyint NOT NULL DEFAULT 1,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                INDEX \`IDX_8fdba3bca96f8af1a318a6e25d\` (\`user_id\`),
                INDEX \`IDX_c6ebe5b62f8fe52bddc0f24754\` (\`token_address\`),
                INDEX \`IDX_24cb3fca64047ba5e896745a63\` (\`token_symbol\`),
                INDEX \`IDX_96a5e5aeb97068181b6dbfa906\` (\`token_decimal\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`user_device\` (
                \`id\` bigint NOT NULL AUTO_INCREMENT,
                \`user_id\` bigint NOT NULL,
                \`device_id\` varchar(255) NULL DEFAULT '',
                \`fcm_token\` varchar(255) NULL,
                \`os\` varchar(255) NOT NULL,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                INDEX \`IDX_4875276d131a82b6792e73b9b1\` (\`user_id\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`user_security\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`phone_number_verified\` enum ('0', '1') NOT NULL DEFAULT '0',
                \`type_2fa\` int NOT NULL DEFAULT '0',
                \`otp\` varchar(255) NULL,
                \`secret_key\` varchar(255) NULL,
                \`expired_time\` datetime NULL,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`user_setting\` (
                \`id\` bigint NOT NULL AUTO_INCREMENT,
                \`user_id\` bigint NOT NULL,
                \`language\` enum ('en', 'ja') NOT NULL DEFAULT 'en',
                \`biometrics\` tinyint NOT NULL DEFAULT 0,
                \`default_currency\` varchar(255) NOT NULL,
                \`default_currency_decimal\` int NULL DEFAULT '0',
                \`default_wallet_id\` int NULL,
                \`default_network_id\` int NULL,
                \`fee_level\` enum ('low', 'medium', 'high') NULL DEFAULT 'medium',
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                INDEX \`IDX_94922c04577bc2bc75f2faba53\` (\`user_id\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`user_wallet\` (
                \`id\` bigint NOT NULL AUTO_INCREMENT,
                \`user_id\` bigint NOT NULL,
                \`name\` varchar(255) NULL,
                \`address\` varchar(255) NOT NULL,
                \`is_enabled\` tinyint NOT NULL DEFAULT 1,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                INDEX \`IDX_7b752f8f6f9b2e1f85c120894d\` (\`user_id\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`user\` (
                \`id\` bigint NOT NULL AUTO_INCREMENT,
                \`username\` varchar(255) NOT NULL,
                \`password\` varchar(255) NULL,
                \`email\` varchar(255) NULL,
                \`invite_code\` varchar(255) NULL,
                \`referring_code\` varchar(255) NULL,
                \`bio\` longtext NULL,
                \`phone\` varchar(255) NULL,
                \`avatar\` varchar(255) NULL,
                \`user_security_id\` varchar(255) NOT NULL,
                \`roles\`
                set ('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
                    \`is_enabled\` tinyint NOT NULL DEFAULT 1,
                    \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                    \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                    UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`),
                    UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`),
                    UNIQUE INDEX \`IDX_afbd6aa2cb8da01c11e1f9519f\` (\`invite_code\`),
                    PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX \`IDX_afbd6aa2cb8da01c11e1f9519f\` ON \`user\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\`
        `);
        await queryRunner.query(`
            DROP TABLE \`user\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_7b752f8f6f9b2e1f85c120894d\` ON \`user_wallet\`
        `);
        await queryRunner.query(`
            DROP TABLE \`user_wallet\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_94922c04577bc2bc75f2faba53\` ON \`user_setting\`
        `);
        await queryRunner.query(`
            DROP TABLE \`user_setting\`
        `);
        await queryRunner.query(`
            DROP TABLE \`user_security\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_4875276d131a82b6792e73b9b1\` ON \`user_device\`
        `);
        await queryRunner.query(`
            DROP TABLE \`user_device\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_96a5e5aeb97068181b6dbfa906\` ON \`user_balance\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_24cb3fca64047ba5e896745a63\` ON \`user_balance\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_c6ebe5b62f8fe52bddc0f24754\` ON \`user_balance\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_8fdba3bca96f8af1a318a6e25d\` ON \`user_balance\`
        `);
        await queryRunner.query(`
            DROP TABLE \`user_balance\`
        `);
        await queryRunner.query(`
            DROP TABLE \`transaction\`
        `);
        await queryRunner.query(`
            DROP TABLE \`nft\`
        `);
        await queryRunner.query(`
            DROP TABLE \`nft_owner\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_351676a0f6893fe3dabd7c4f05\` ON \`nft_market\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_7e72d034f6f4bd553e4d74896b\` ON \`nft_market\`
        `);
        await queryRunner.query(`
            DROP TABLE \`nft_market\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_91c0769b42d0542914062db6ad\` ON \`nft_market_log\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_e9732ac91c86716359bbe4fdab\` ON \`nft_market_log\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_0eaacf84cbedc4160ad1d2f090\` ON \`nft_market_log\`
        `);
        await queryRunner.query(`
            DROP TABLE \`nft_market_log\`
        `);
        await queryRunner.query(`
            DROP TABLE \`network\`
        `);
        await queryRunner.query(`
            DROP TABLE \`kms_key\`
        `);
        await queryRunner.query(`
            DROP TABLE \`kms_cmk\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_0e4eebbc24a50661f403bdd2a0\` ON \`hot_wallet\`
        `);
        await queryRunner.query(`
            DROP TABLE \`hot_wallet\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_96519432f789c1624978f27ffc\` ON \`file\`
        `);
        await queryRunner.query(`
            DROP TABLE \`file\`
        `);
        await queryRunner.query(`
            DROP TABLE \`default_token\`
        `);
    }

}
