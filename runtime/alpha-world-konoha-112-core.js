// ===============================================================================
// ISSUE #112 â€” KONOHA WORLD INFO / MARKERS / STORY LOCATOR / ACTIVATION WAVE 1
// Authority: Documentation/World/Alpha Village Region Info Marker Story Locator
// and Executable Activation Package 2026-09-11.md
// ============================================================================
(function installKonohaWorld112(){
  "use strict";
  const INFO_SCHEMA="sc.worldInfoProjection.v1";
  const LOCATOR_SCHEMA="sc.worldStoryLocator.v1";
  const MANIFEST_ID="sc_world_alpha_activation_konoha_v1_2026_09_11";
  const STANDING="konoha_alpha_standing_pool_v1";
  const PRESSURE="konoha_arc1_pressure_pool_v1";
  const RESPONSIVE="konoha_capability_responsive_pool_v1";
  const ACTIVATION_RECEIPT="world_activation_konoha_v1_2026_09_11";

  const ROWS=Object.freeze([
    {id:"konoha_alpha_gate_delivery_assistance",pool:STANDING,host:"KON-P10",category:"SIDE_OCCURRENCE",reward:120,rewardAction:"complete_delivery",actions:["verify_destination","complete_delivery","return_sender","decline"]},
    {id:"konoha_alpha_market_lost_parcel",pool:STANDING,host:"KON-P09",category:"INVESTIGATION",reward:100,rewardAction:"return_parcel",actions:["inspect_last_known","ask_witnesses","locate_parcel","return_parcel","leave"]},
    {id:"konoha_alpha_hospital_supply_run",pool:STANDING,host:"KON-P03",category:"SIDE_OCCURRENCE",reward:150,rewardAction:"deliver_supplies",actions:["accept_delivery","verify_destination","deliver_supplies","report_delay","decline"]},
    {id:"konoha_alpha_river_satchel_recovery",pool:STANDING,host:"KON-O03",category:"INVESTIGATION",reward:100,rewardAction:"return_satchel",actions:["assess_current","recover_safe","report_location","return_satchel","leave"]},
    {id:"konoha_alpha_crafts_shipment_delay",pool:STANDING,host:"KON-P04",secondary:"KON-O19",category:"INVESTIGATION",reward:180,rewardAction:"complete_logistics",actions:["inspect_paperwork","check_storehouse","locate_shipment","complete_logistics","report_discrepancy","decline"]},
    {id:"konoha_alpha_messenger_roost_delay",pool:STANDING,host:"KON-O18",category:"INVESTIGATION",reward:140,rewardAction:"assist_dispatch",actions:["hear_report","inspect_dispatch","check_route","assist_dispatch","report","leave"]},
    {id:"konoha_alpha_storehouse_inventory_discrepancy",pool:STANDING,host:"KON-O19",category:"INVESTIGATION",reward:220,rewardAction:"formal_report",actions:["compare_records","inspect_count","ask_custodians","preserve_discrepancy","formal_report","decline"]},
    {id:"konoha_alpha_pump_maintenance_alarm",pool:STANDING,host:"KON-O20",category:"INVESTIGATION",reward:180,rewardAction:"complete_civic_assistance",actions:["inspect_surface","identify_fault","warn_workers","request_specialist","complete_civic_assistance","report","leave"]},
    {id:"konoha_alpha_veterinary_runaway_animal",pool:STANDING,host:"KON-O21",category:"INVESTIGATION",reward:120,rewardAction:"return_animal",actions:["ask_handler","inspect_tracks","search","return_animal","report","decline"]},
    {id:"konoha_alpha_memorial_record_request",pool:STANDING,host:"KON-O04",category:"INVESTIGATION",reward:0,actions:["locate_inscription","compare_reference","listen","decline"]},
    {id:"konoha_alpha_academy_lost_equipment",pool:STANDING,host:"KON-P06",secondary:"KON-O17",category:"INVESTIGATION",reward:0,actions:["hear_report","inspect_last_known","recover_equipment","return_equipment","report","decline"]},
    {id:"konoha_alpha_training_observation_drill",pool:STANDING,host:"KON-P07",category:"TRAINING_DEVELOPMENT",reward:0,actions:["accept","observe","record_details","report","end"]},
    {id:"fire_arc1_pressure_marked_residence",pool:PRESSURE,host:"KON-P09",category:"INVESTIGATION",reward:0,actions:["inspect_mark","watch","ask_occupant","remove_or_alter","report","ignore"]},
    {id:"fire_arc1_pressure_records_tampering",pool:PRESSURE,host:"KON-P01",category:"INVESTIGATION",reward:0,actions:["inspect_entry","compare_record","question_custodian","preserve_tamper","report"]},
    {id:"fire_arc1_pressure_rooftop_observer",pool:PRESSURE,host:"KON-P09",category:"INVESTIGATION",reward:0,actions:["approach","flank_if_route","pretend_unaware","observe_target","report","leave"]},
    {id:"fire_arc1_pressure_false_patrol",pool:PRESSURE,host:"KON-P10",category:"INVESTIGATION",reward:0,actions:["accept_explanation","verify_credentials","route_question","observe_or_follow","challenge","report_or_leave"]},
    {id:"konoha_resp_false_identity_gate_ledger",pool:RESPONSIVE,host:"KON-P10",category:"INVESTIGATION",reward:0,requires:["skill_false_identity","false_profile"],actions:["answer_ordinary","use_false_profile","preserve_contradiction","leave"]},
    {id:"konoha_resp_false_identity_counterwatch",pool:RESPONSIVE,host:"KON-P09",alternate:"KON-O15",category:"INVESTIGATION",reward:0,requires:["skill_false_identity","false_profile","skill_counter_surveillance_habit"],actions:["observe_tail","preserve_alias","misdirect_legal","confront","report","leave"]},
    {id:"konoha_resp_false_identity_fuin_ward",pool:RESPONSIVE,host:"KON-P05",category:"DISCOVERY",reward:0,requires:["skill_false_identity","false_profile","skill_seal_pattern_literacy"],actions:["inspect_ward","profile_query","compare_structure","leave_unchanged","report_discrepancy"]},
    {id:"konoha_resp_medical_poison_recovery",pool:RESPONSIVE,host:"KON-P03",category:"INVESTIGATION",reward:0,requires:["skill_medical_triage_instinct","skill_poison_symptom_recognition"],actions:["assess","recognise_possible_poison","preserve_sample","call_authority","decline"]},
    {id:"konoha_resp_tracking_evidence_three_trails",pool:RESPONSIVE,host:"KON-O15",category:"INVESTIGATION",reward:0,requires:["skill_scent_pursuit","skill_evidence_thread_reconstruction","evidence_2_3"],actions:["pursue_scent","compare_evidence","reconstruct_sequence","report","stop"]},
    {id:"konoha_resp_fuin_barrier_service_ward",pool:RESPONSIVE,host:"KON-O20",category:"DISCOVERY",reward:0,requires:["skill_seal_pattern_literacy","skill_barrier_recognition_intuition"],actions:["inspect_pattern","observe_recognition","record_response","report","leave"]},
    {id:"konoha_resp_byakugan_peripheral_discrepancy",pool:RESPONSIVE,host:"KON-O09",category:"TRAINING_DEVELOPMENT",reward:0,requires:["skil_byakugan_peripheral_detail","active_byakugan_context"],actions:["authorised_observation","report_peripheral_detail","compare_ordinary_view","end_observation"]},
    {id:"konoha_alpha_eastern_drainage_trace",pool:STANDING,host:"KON-O16",category:"DISCOVERY‹™]Ø\™Œš[š]NYKXİ[ÛœÎ–Èš[œÜXİİ˜XÙH‹œ™\Ù\™WÜ™\Ü‹™›Ûİ×ÜX›X×Ü›İ]H‹˜ÛÛ[Z]Üİ\ÜXÚ[Û—İ˜XÙH‹›X]™H—_BˆJNÂ‚ˆÛÛœİTÔVOSØš™Xİ™œ™Y^™JÂˆÛÛ›ÚWØ[WÙØ]WÙ[]™\WØ\ÜÚ\İ[˜ÙNˆ‘Ø]H[]™\H\ÜÚ\İ[˜ÙH‹ÛÛ›ÚWØ[WÛX\šÙ]ÛÜİÜ\˜Ù[ˆ“ÜİX\šÙ]\˜Ù[‹ÛÛ›ÚWØ[WÚÜÜ][Üİ\WÜ[ˆ’ÜÜ][İ\H[ˆ‹ÛÛ›ÚWØ[WÜš]™\—ÜØ]Ú[Ü™XÛİ™\Nˆ”š]™\ˆØ]Ú[™XÛİ™\H‹ÛÛ›ÚWØ[WØÜ˜Y×ÜÚ\Y[Ù[^NˆÜ˜YÛY[ˆÚ\Y[[^H‹ÛÛ›ÚWØ[WÛY\ÜÙ[™Ù\—Ü›ÛÜİÙ[^Nˆ“Y\ÜÙ[™Ù\ˆ›ÛÜİ[^H‹ÛÛ›ÚWØ[WÜİÜ™Zİ\ÙWÚ[™[ÜWÙ\ØÜ™\[˜ŞNˆ”İÜ™Zİ\ÙH[™[ÜH\ØÜ™\[˜ŞH‹ÛÛ›ÚWØ[WÜ[\ÛXZ[[˜[˜ÙWØ[\›Nˆ”[\XZ[[˜[˜ÙH[\›H‹ÛÛ›ÚWØ[Wİ™]\š[˜\WÜ[˜]Ø^WØ[š[X[ˆ”[˜]Ø^H™]\š[˜\H[š[X[‹ÛÛ›ÚWØ[WÛY[[ÜšX[Ü™XÛÜ™Ü™\]Y\İˆ“Y[[ÜšX[™XÛÜ™™\]Y\İ‹ÛÛ›ÚWØ[WØXØY[^WÛÜİÙ\]Z\Y[ˆXØY[^HÜİ\]Z\Y[‹ÛÛ›ÚWØ[Wİ˜Z[š[™×ÛØœÙ\˜][Û—Ùš[ˆ“ØœÙ\˜][Ûˆš[‹š\™WØ\˜ÌWÜ™\Üİ\™WÛX\šÙYÜ™\ÚY[˜ÙNˆ“X\šÙY™\ÚY[˜ÙH‹š\™WØ\˜ÌWÜ™\Üİ\™WÜ™XÛÜ™×İ[\\š[™Îˆ”™XÛÜ™È[\\š[™È‹š\™WØ\˜ÌWÜ™\Üİ\™WÜ›ÛÙÜÛØœÙ\™\ˆ”›ÛÙÜØœÙ\™\ˆ‹š\™WØ\˜ÌWÜ™\Üİ\™WÙ˜[ÙWÜ]›Ûˆ‘˜[ÙH]›Û]HØ]H‹ÛÛ›ÚWÜ™\ÜÙ˜[ÙWÚY[]WÙØ]WÛYÙ\ˆ•H˜[YHÛˆHØ]HYÙ\ˆ‹ÛÛ›ÚWÜ™\ÜÙ˜[ÙWÚY[]WØÛİ[\Ø]Úˆ•HØ]Ú\ˆÚÈÙÙÙYHÜ›Û™È\œÛÛˆ‹ÛÛ›ÚWÜ™\ÜÙ˜[ÙWÚY[]WÙZ[—İØ\™ˆH˜[YHÜš][ˆ[ÈHØ\™‹ÛÛ›ÚWÜ™\ÜÛYYXØ[ÜÚ\ÛÛ—Ü™XÛİ™\Nˆ•H]Y[ÚÈÚİ[™H™XÛİ™\š[™È‹ÛÛ›ÚWÜ™\Üİ˜XÚÚ[™×Ù]šY[˜ÙWİ™YWİ˜Z[Îˆ•™YH˜Z[ËÛ™H›ÙH‹ÛÛ›ÚWÜ™\ÜÙZ[—Ø˜\œšY\—ÜÙ\šXÙWİØ\™ˆ“ÛÙ\šXÙHØ\™[™ÚZÙH‹ÛÛ›ÚWÜ™\ÜØXZİYØ[—Ü\š\\˜[Ù\ØÜ™\[˜ŞNˆ’qjYØH\š\\˜[\ØÜ™\[˜ŞH‹ÛÛ›ÚWØ[WÙX\İ\›—Ù˜Z[˜YÙWİ˜XÙNˆ‘X\İ\›ˆ˜Z[˜YÙH˜XÙH‚ˆJNÂ‚ˆ[˜İ[Ûˆ\İÜJ
^Ü™]\›ˆ^Y\‘]I‰\œ˜^Kš\Ğ\œ˜^J^Y\‘]K˜Xİ]š]R\İÜJOÜ^Y\‘]K˜Xİ]š]R\İÜN–×NßBˆ[˜İ[ÛˆÛÛ[Z]Y
Y
^Ü™]\›ˆ\İÜJ
KœÛÛYJOœ‰‰œ‹˜ÛÛ[Z]YOO]YI‰Š‹šYOOZY‹›ØØİ\œ™[˜ÙRYOOZY‹œÛİ\˜ÙSØØİ\œ™[˜ÙRYOOZY
JNßBˆ[˜İ[Ûˆ™XÛÜ™
™XÊ^ÚYŠP\œ˜^Kš\Ğ\œ˜^J^Y\‘]K˜Xİ]š]R\İÜJJ\^Y\‘]K˜Xİ]š]R\İÜOV×NÚYŠXÛÛ[Z]Y
™XË›ØØİ\œ™[˜ÙRY™XËšY
J\^Y\‘]K˜Xİ]š]R\İÜKœ\Ú
™XÊNßBˆ[˜İ[ÛˆØÊY
^Ü™]\›ˆ\[ÙˆÙ][RÛÛ›ÚUŒÓØØ][ÛOOH™[˜İ[ÛˆÙÙ][RÛÛ›ÚUŒÓØØ][ÛŠY
N›[ßBˆ[˜İ[Ûˆ[˜ÚÜŠY
^ØÛÛœİ[ØÊY
NÜ™]\›ˆŞŞ›N›_N›[ßBˆ[˜İ[ÛˆÛ›İÛYÙJY
^ÂˆYŠ×’ÓÓ‹T
ÉË\İ
Y
J\™]\›ˆšY[YšYYÂˆYŠYOOH’ÓÓ‹TÌHŠ\™]\›ˆšÛ›İÛ—Ü™\İšXİYÂˆYŠ\[ÙˆÙ][RÛÛ›ÚUŒÑ^XÚ]Û›İÛYÙTİ]OOOH™[˜İ[ÛˆŠ\™]\›ˆÙ][RÛÛ›ÚUŒÑ^XÚ]Û›İÛYÙTİ]JY
_[œ™XÛÙÛš\ÙYÂˆ™]\›ˆ[œ™XÛÙÛš\ÙYÂˆBˆ[˜İ[ÛˆÜİÛ›İÛXØÙ\ÜÚX›JY
^Ü™]\›ˆÈšY[YšYY‹˜Xİ[Û˜X›H—Kš[˜ÛY\ÊÛ›İÛYÙJY
JNßBˆ[˜İ[ÛˆXÜ]Z\Ú][ÛŠ
^Ü™]\›ˆ\[Ùˆ[œİ\™T^Y\XÜ]Z\Ú][Û”İ]OOOH™[˜İ[ÛˆÙ[œİ\™T^Y\XÜ]Z\Ú][Û”İ]J
N›[ßBˆ[˜İ[ÛˆÛÛ›ÚQœ™YT^J
^ÂˆÛÛœİOXXÜ]Z\Ú][ÛŠ
NÂˆ™]\›ˆHJI‰˜K˜Ú›ÛšXÛSÜšYÚ[‰‰˜K˜Ú›ÛšXÛSÜšYÚ[‹˜Xİ]™RÛÛ›ÚQ[\™YOO]YI‰˜K˜XØY[^UX[Q›Ü›X][Û‰‰˜K˜XØY[^UX[Q›Ü›X][Û‹˜ÛÛ\]YOO]YI‰˜K˜XØY[^UX[Q›Ü›X][Û‹˜ÛÛ[X][ÛÛÛ\]YOO]YI‰ˆJK™Ù[š[”›Üİ\•˜[œÚ][Û‰‰˜K™Ù[š[”›Üİ\•˜[œÚ][Û‹[›ØÚÙYOO]YI‰ˆXK™Ù[š[”›Üİ\•˜[œÚ][Û‹˜ÛÛ\]Y
JNÂˆBˆ[˜İ[Ûˆ\˜ÌPY\“LŠ
^Ü™]\›ˆ\[Ùˆ\Ğ\˜ÌSØØİ\œ™[˜ÙOOOH™[˜İ[Ûˆ‰‰Š\Ğ\˜ÌSØØİ\œ™[˜ÙJ›ØØ×Ø\˜ÌWÛLWÜİÜWØÛÛ\]HŠ_\Ğ\˜ÌSØØİ\œ™[˜ÙJ›ØØ×Ø\˜ÌWÛL—ÜİÜWØÛÛ\]HŠ_\Ğ\˜ÌSØØİ\œ™[˜ÙJ›ØØ×Ø\˜ÌWÛL×ÜİÜWØÛÛ\]HŠ_\Ğ\˜ÌSØØİ\œ™[˜ÙJ›ØØ×Ø\˜ÌWÛMÜİÜWØÛÛ\]HŠ_\Ğ\˜ÌSØØİ\œ™[˜ÙJ›ØØ×Ø\˜ÌWÛMWÜİÜWØÛÛ\]HŠ_\Ğ\˜ÌSØØİ\œ™[˜ÙJ›ØØ×Ø\˜ÌWÛM—ÜİÜWØÛÛ\]HŠ_\Ğ\˜ÌSØØİ\œ™[˜ÙJ›ØØ×Ø\˜ÌWÛM×ÜİÜWØÛÛ\]HŠ_\Ğ\˜ÌSØØİ\œ™[˜ÙJ›ØØ×Ø\˜ÌWÛNÜİÜWØÛÛ\]Š_\Ğ\˜ÌSØØİ\œ™[˜ÙJ›ØØ×Ø\˜ÌWÛNWÜİÜWØÛÛ\]Š_\Ğ\˜ÌSØØİ\œ™[˜ÙJ›ØØ×Ø\˜ÌWÛLLÜİÜWØÛÛ\]HŠ_\Ğ\˜ÌSØØİ\œ™[˜ÙJ›ØØ×Ø\˜ÌWÛLLWÜİÜWØÛÛ\]ŠJNßBˆ[˜İ[Ûˆ\ÔÚÚ[XØÙ\ÜÊÚÚ[Y
^Âˆ›ÜŠÛÛœİ›ˆÙˆÈš\ÓX\›™YÚÚ[XØÙ\ÜÈ‹š\ÔÚÚ[XØÙ\ÜÈ‹œ^Y\’\ÔÚÚ[XØÙ\ÜÈ—J^ÚYŠ\[ÙˆÛØ˜[\ÖÙ›—OOOH™[˜İ[ÛˆŠ^İ^ÚYŠÛØ˜[\ÖÙ›—JÚÚ[Y
OOO]YJ\™]\›ˆYNßXØ]Ú
ÙJ^ß__Bˆ™]\›ˆ\İÜJ
KœÛÛYJOÚYŠ\Ÿ‹˜ÛÛ[Z]YOO]YJ\™]\›ˆ˜[ÙNØÛÛœİ\‹™]I‰\[Ùˆ‹™]OOOH›Øš™XİÜ‹™]NßNØÛÛœİ™YœÏP\œ˜^Kš\Ğ\œ˜^J‹œÛİ\˜ÙT™YœÊOÜ‹œÛİ\˜ÙT™YœÎ–×NØÛÛœİ^XİJ‹œÚÚ[YOO\ÚÚ[YœÚÚ[YOO\ÚÚ[YXÚš\]YRYOO\ÚÚ[YœÙ[X[XĞØ\Xš[]RYOO\ÚÚ[Y™YœËœÛÛYJO	‰–ÈœÚÚ[‹XÚš\]YH‹˜Ø\Xš[]H—Kš[˜ÛY\Ê\JI‰šYOO\ÚÚ[Y
JNÜ™]\›ˆ^Xİ	‰Š‹˜XØÙ\ÜÏOOH‘ÔS•QŸ˜XØÙ\ÜÏOOH‘ÔS•QŸ˜XØÙ\ÜÑÜ˜[YOO]Y_›X\›™YOO]Y_›İÛ™YOO]YJNßJNÂˆBˆ[˜İ[Ûˆ\Ñ˜[ÙT›Ùš[J
^Ü™]\›ˆ\İÜJ
KœÛÛYJOÚYŠ\Ÿ‹˜ÛÛ[Z]YOO]YJ\™]\›ˆ˜[ÙNØÛÛœİ\‹™]I‰\[Ùˆ‹™]OOOH›Øš™XİÜ‹™]NßNÜ™]\›ˆ™˜[ÙT›Ùš[PXİ]™OOO]Y_™˜[ÙT›Ùš[RY›YÚ][X]Q˜[ÙT›Ùš[OOO]Y_‹\OOOH™˜[ÙWÚY[]WÜ›Ùš[WØÛÛ[Z]YßJNßBˆ[˜İ[Ûˆ\Ñ]šY[˜ÙLÌÊ
^ØÛÛœİ™YœÏ[™]ÈÙ]

NÚ\İÜJ
K™›Ü‘XXÚ
OÚYŠ\Ÿ‹˜ÛÛ[Z]YOO]YJ\™]\›Ê‹œÛİ\˜ÙT™Yœß×JK™›Ü‘XXÚ
OÚYŠ	‰