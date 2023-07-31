const { ActionRowBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle, ButtonBuilder, ButtonStyle, AttachmentBuilder} = require('discord.js');

client.on(Events.InteractionCreate, async interaction => {
    try {

	if (!interaction.isButton()) return;
	if (interaction.customId === 'lineCooldown')
	{
		const timestamp = Date.now();
		const relativeTimer =  Math.floor((timestamp / 1000) + 1800);
		interaction.reply({content: cdmsg[interaction.locale] ?? `:flag_gb: Your channel cooldown ends at <t:${relativeTimer}:t>, <t:${relativeTimer}:R>.
:flag_id: Jeda saluranmu berakhir pada <t:${relativeTimer}:t>, <t:${relativeTimer}:R>`, ephemeral:true });
	}
	else if (interaction.customId === 'help')
	{
	await interaction.reply({ files: ['Buttons.png'], ephemeral:true });
	await interaction.followUp({content: helpmsg[interaction.locale] ?? `## :flag_gb: __**How to use the World Boss Timer Menu**__ 

1. 	Select the channel you are currently in.
2.	Click on the appropriate status update button:
2a.	**[ ⚰️ Killed! ]** : Mark the boss in the selected channel as defeated. Starts a 1 hr respawn timer.
2b.	**[ 🥷 Missing! ]** : Mark the boss in the selected channel as missing or sniped. Alerts everyone of an unreported boss kill in said channel.
	
🔰 **NOTE**: Taking too long to click a button after selecting a channel will cancel the interaction.

**__Statuses__**
⚰️ : Boss is dead
🌱 : Boss will respawn in <time>
⚠️ : Boss is missing. Respawn time is unknown
📣 : Boss was reported missing <time> ago

## :flag_id: __**Cara Menggunakan Menu World Boss Timer**__ 

1. 	Pilih saluran / channel di mana kamu berada
2.	Klik tombol pembaruan status yang sesuai
2a.	**[ ⚰️ Killed! ]** : Menandai Boss di saluran / channel yang dipilih telah dikalahkan. Memulai hitung mundur 1 jam untuk muncul kembali.
2b.	**[ 🥷 Missing! ]** : Menandai Boss di saluran / channel yang dipilih telah hilang atau dibunuh diam-diam. Memperingatkan semua orang soal pembunuhan Boss tanpa laporan di saluran tersebut.
	
🔰 **CATATAN**: Terlalu lama mengeklik tombol setelah memilih saluran akan membatalkan interaksi.

**__Status__**
⚰️ : Boss sudah mati
🌱 : Boss akan muncul kembali dalam <masa>
⚠️ : Boss menghilang. Kemunculan kembali tidak diketahui.
📣 : Boss dilaporkan hilang <masa> yang lalu.`,
ephemeral: true})
	}
} catch (error) {
    return console.log(error);
    }
});
		
const helpmsg = {
fr: 
`## :flag_fr: __**Comment utiliser le World Boss Chronomètre**__ 

1. Sélectionner le canal où vous-êtes
2. Choisissez le statut actuel du boss:
2a.	**[ ⚰️ Killed! ]** : Marquer le Boss étant vaincu, cela commence un chronomètre de réapparition d'une heure.
2b.	**[ 🥷 Missing! ]** : Marquer le Boss étant absent ou snipé, cela alerte les joueurs la mort d'un Boss non-déclaré.
		
🔰 **NOTE**: Prendre trop de temps pour cliquer sur un bouton après avoir sélectionné un canal annulera l'interaction.
	
**__Statuts__**
⚰️ : Le Boss est mort
🌱 : Le Boss réapparait dans <time>
⚠️ : Le Boss est absent. Temps de réapparition uncertain
📣 : Le Boss a été déclaré absent il y a <temps>`,

vi: 
`## :flag_vn: __**Cách sử dụng timer đi oánh World Boss**__ 

1. Chọn channel/kênh bạn đang cần đánh dấu
2. Click chọn đúng trạng thái sau:
2a.	**[ ⚰️ Killed! ]** : Chọn sau khi boss đã bị tiêu diệt (Có chest). SV sẽ bắt đầu tính giờ boss ra lại.
2b.	**[ 🥷 Missing! ]** : Chọn khi không thấy boss. Thông báo để ae biết boss đã bị giết không biết thời điểm.

🔰 **Chú ý**: Nếu để chờ quá lâu Menu sẽ tự đóng.

**__trạng thái__**
⚰️ : Boss đã chết
🌱 : Boss sẽ ra lại vào lúc <thời gian>
🥷 : Boss mất tích. Thời điểm ra lại ko xác định
📣 : Boss xác định mất tích <thời gian> trước`,

th: 
`## :flag_th: __**วิธีใช้งานบอทบอสโลก**__ 

1. เลือกแชนแนลที่คุณอยู่ในขณะนี้ 
2. อัพเดตสถานะของบอส โดยการกดปุ่ม ดังนี้:
2a.	**[ ⚰️ Killed! ]** : กดปุ่มนี้เพื่อแจ้งว่า บอสในแชลแนลที่เลือกนั้นถูกฆ่าแล้ว (เกิดใหม่ภายใน 1 ชม.)
2b.	**[ 🥷 Missing! ]** : กดปุ่มนี้เพื่อแจ้งว่า ไม่พบบอสในแชลแนลที่เลือก (ไม่มีการแจ้งบอทว่าบอสถูกฆ่าแล้ว)

🔰 **หมายเหตุ **: ปุ่มจะไม่ทำงาน หากใช้เวลานานเกินไปในการกดปุ่มหลังจากเลือกแชนแนล

**__สถานะ__**
⚰️ : บอสตายแล้ว
🌱 : บอสจะเกิดใหม่ภายใน <เวลา>
⚠️ : ไม่พบบอส (ไม่ทราบเวลาเกิดใหม่)
📣 : ไม่พบบอสเมื่อ <เวลา> ที่ผ่านมา`,

ja:  
`## :flag_jp: __**ワルドボスメニューの使い方**__ 

1. 現在のチャネルを選んでください。
2. 該当するステータス更新ボタンをクリック：
2a.	**[ ⚰️ Killed! ]** : 選択したチャンネルのボスを倒したことにする。1時間のリスポーンタイマーを開始する。
2b.	**[ 🥷 Missing! ]** : 選択したチャンネルのボスを行方不明、または狙撃されたとしてマークする。チャンネルで未報告のボスが殺された場合、全員に警告する。

🔰 **注意事項**：チャンネルを選択してからボタンをクリックするまでに時間がかかりすぎると、自動的にキャンセルされます。

**__ステータス__**
⚰️ : ボスが死にました
🌱 : ボスが<時間>にリスポーンします。
⚠️ : ボスは行方不明です。リスポーン時間も不明です。
📣 : ボスは＜時間＞前に行方不明に報告された。`,

'zh-CN': 
`## :flag_cn: __**如何使用世界BOSS计时器菜单**__ 

1. 选择您当前所在的频道。
2. 点击状态更新按钮：
2a.	**[ ⚰️ Killed! ]** : 将所选频道BOSS标记为已被击杀。启动倒计时器一小时倒数。
2b.	**[ 🥷 Missing! ]** : 将所选频道的BOSS标记为失踪或狙击。提醒玩家所述频道的BOSS击杀状态不明确。

🔰 **注意**：在指定时间内选择频道按钮后却没选择状态，时计时器将取消BOSS状态更新互动。

**__状态__**
⚰️ : BOSS 已被击杀
🌱 : BOSS 将在<时间内> 复活
⚠️ : BOSS 下落不明。复活时间未知。
📣 : BOSS 在<时间内>前被标记为失踪、`,

'zh-TW': 
`## :flag_cn: __**如何使用世界BOSS计时器菜单**__ 

1. 选择您当前所在的频道。
2. 点击状态更新按钮：
2a.	**[ ⚰️ Killed! ]** : 将所选频道BOSS标记为已被击杀。启动倒计时器一小时倒数。
2b.	**[ 🥷 Missing! ]** : 将所选频道的BOSS标记为失踪或狙击。提醒玩家所述频道的BOSS击杀状态不明确。

🔰 **注意**：在指定时间内选择频道按钮后却没选择状态，时计时器将取消BOSS状态更新互动。

**__状态__**
⚰️ : BOSS 已被击杀
🌱 : BOSS 将在<时间内> 复活
⚠️ : BOSS 下落不明。复活时间未知。
📣 : BOSS 在<时间>前被标记为失踪。`,
}
const cdmsg = {
	fr: `vous pouvez changer de chaîne à <t:${Math.floor((Date.now() / 1000) + 1800)}:t>, <t:${Math.floor((Date.now() / 1000) + 1800)}:R>`,
	vi: `Thời gian chờ Channel sẽ kết thúc vào <t:${Math.floor((Date.now() / 1000) + 1800)}:t>, <t:${Math.floor((Date.now() / 1000) + 1800)}:R>`,
	th: `บอสจะเกิดใหม่เมื่อ <t:${Math.floor((Date.now() / 1000) + 1800)}:t>, <t:${Math.floor((Date.now() / 1000) + 1800)}:R>`,
	ja: `チャネルのクールダウンは <t:${Math.floor((Date.now() / 1000) + 1800)}:t>, <t:${Math.floor((Date.now() / 1000) + 1800)}:R>に終了します。`,
	'zh-CN': `您的频道冷却时间结束于 <t:${Math.floor((Date.now() / 1000) + 1800)}:t>, <t:${Math.floor((Date.now() / 1000) + 1800)}:R>`,
	'zh-TW': `您的频道冷却时间结束于 <t:${Math.floor((Date.now() / 1000) + 1800)}:t>, <t:${Math.floor((Date.now() / 1000) + 1800)}:R>`
};
