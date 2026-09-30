// ============================================================================
// ISSUE #190 — FINAL WRITING PRESENTATION LOCALISATION — 35520
//
// Localises the expression-only Writing-final pass in 33600. English remains
// canonical. This module registers presentation strings only and owns no Story
// transitions, choices, facts, progression, Battle, Rank or PL semantics.
// ============================================================================
(function installAlphaLocalisationFinalWriting35520(){
"use strict";
if(globalThis.SC_ALPHA_LOCALISATION_FINAL_WRITING_35520)return;
const core=globalThis.SC_ALPHA_LOCALISATION_35500;
if(!core||typeof core.registerLocaleMessages!=="function")throw new Error("alpha_localisation_35500_required");
const PATCH_ID="alpha_localisation_final_writing_35520_v1_2026_09_17";
const pairs=[];
const add=(en,es)=>pairs.push([en,es]);

// Hinata — final #170 presentation.
add("Dawn has barely reached the Hyūga compound when Hinata's palms begin to sting. The same form. Again. Feet placed exactly where they were placed yesterday. The instructor watches her finish it without comment, then steps aside and calls another student forward. ‘Enough repetition. Show me what you do when the other person moves.’","El amanecer apenas ha alcanzado el complejo Hyūga cuando las palmas de Hinata empiezan a arder. La misma forma. Otra vez. Los pies exactamente donde estuvieron ayer. El instructor la ve terminar sin comentar nada, luego se aparta y llama a otro estudiante. ‘Basta de repetir. Muéstrame qué haces cuando la otra persona se mueve.’");
add("Her opponent settles into stance. Hinata can feel the familiar urge to wait until she is completely certain. The instructor is already watching.","Su oponente adopta la postura. Hinata siente el impulso conocido de esperar hasta estar completamente segura. El instructor ya está observando.");
add("Move first. Don't give them the tempo.","Muévete primero. No le cedas el ritmo.");
add("Let them show the opening.","Deja que muestre la apertura.");
add("Make them come through her guard.","Haz que tenga que atravesar su guardia.");
add("Watch the shoulders and feet before committing.","Observa hombros y pies antes de comprometerte.");
add("The first exchange breaks the neat Academy rhythm. Her opponent adjusts. So does Hinata.","El primer intercambio rompe el ritmo ordenado de la Academia. Su oponente se ajusta. Hinata también.");
add("One clean opening appears—and begins to close.","Aparece una apertura limpia y empieza a cerrarse.");
add("At the compound gate, a younger Hyūga student is still trying the same turn of the hip. They stop the instant they realise Hinata has noticed.","En la entrada del complejo, un estudiante Hyūga más joven sigue intentando el mismo giro de cadera. Se detiene en cuanto nota que Hinata se ha dado cuenta.");
add("Show them once. Slowly.","Muéstraselo una vez. Despacio.");
add("Tell them where the movement is going wrong.","Dile dónde está fallando el movimiento.");
add("Leave them the space to work it out.","Déjale espacio para resolverlo.");
add("Stay long enough to see what they're missing.","Quédate el tiempo suficiente para ver qué le falta.");
add("Tomorrow... I'll do it cleaner.","Mañana... lo haré mejor.");

// Wasabi Izuno.
add("The Academy target gets a head start and vanishes into the village training routes. A flare at the extraction point marks the only thing Wasabi knows for certain: if it goes up before she gets there, she was too slow—or followed the wrong story.","El objetivo de la Academia sale con ventaja y desaparece entre las rutas de entrenamiento de la aldea. Una bengala en el punto de extracción marca lo único que Wasabi sabe con certeza: si se enciende antes de que llegue, fue demasiado lenta o siguió la pista equivocada.");
add("The obvious trail is almost too obvious. Scuffed dirt points east. A snapped reed points toward the drainage path. Two other students are already arguing over which one matters.","El rastro evidente es casi demasiado evidente. La tierra rozada apunta al este. Un junco roto apunta hacia el canal de drenaje. Otros dos estudiantes ya discuten sobre cuál importa.");
add("Take the trail at face value and move.","Tomar el rastro tal como parece y avanzar.");
add("Check what the environment says before trusting footprints.","Comprobar qué dice el entorno antes de confiar en las huellas.");
add("Use the other students instead of racing them.","Usar a los otros estudiantes en vez de competir contra ellos.");
add("Forget the trail. Predict the extraction route.","Olvidar el rastro. Predecir la ruta de extracción.");
add("A second set of signs appears and the pursuit stops being clean. Wasabi has enough information to commit—but not enough to know she is right.","Aparece un segundo conjunto de señales y la persecución deja de ser clara. Wasabi tiene suficiente información para decidir, pero no para saber que tiene razón.");
add("Another Academy student skids into view with a Rogue Genin crowding their escape. That is not part of the trial. The target is still moving.","Otro estudiante de la Academia aparece derrapando mientras un Genin renegado le corta la huida. Eso no forma parte de la prueba. El objetivo sigue moviéndose.");
add("Next time, commit faster.","La próxima vez, decidir más rápido.");
add("Next time, trust what I notice before what they leave for me.","La próxima vez, confiar en lo que noto antes que en lo que dejan para mí.");
add("The obvious route is obvious for a reason—and that's the problem.","La ruta evidente es evidente por una razón, y ese es el problema.");
add("Catching the target wasn't the only thing happening out there.","Atrapar al objetivo no era lo único que estaba ocurriendo ahí fuera.");
add("Wasabi drops back onto the village route at a jog, already replaying the turns she trusted and the ones she didn't.","Wasabi vuelve a la ruta de la aldea al trote, repasando ya los giros en los que confió y aquellos en los que no.");

// Mirai.
add("The escort begins badly only in hindsight. The civilian is polite, knows the route, thanks Mirai for walking on the road-side of the path and asks ordinary questions about the Academy. Nothing about them demands suspicion.","La escolta solo parece haber empezado mal al mirarla en retrospectiva. El civil es educado, conoce la ruta, agradece a Mirai que camine del lado de la carretera y hace preguntas normales sobre la Academia. Nada exige sospechar.");
add("Conversation fills the walk. Mirai asks something ordinary—not because she is interrogating them, but because silence for the whole escort would be strange.","La conversación llena el trayecto. Mirai pregunta algo normal, no porque esté interrogando, sino porque guardar silencio durante toda la escolta sería extraño.");
add("Stop them and ask directly.","Detenerlo y preguntar directamente.");
add("Ask again from a different angle.","Preguntar otra vez desde otro ángulo.");
add("Act like she didn't notice. Watch what changes.","Actuar como si no lo hubiera notado. Observar qué cambia.");
add("Change the route without warning and see how they react.","Cambiar la ruta sin avisar y ver cómo reacciona.");
add("At the checkpoint the transformation releases. The person Mirai protected is still standing exactly where she delivered them—safe, cooperative and not the person she thought she was escorting. For one ugly second, both facts are true at once.","En el punto de control se deshace la transformación. La persona que Mirai protegió sigue exactamente donde la entregó: a salvo, cooperativa y no es quien Mirai creía estar escoltando. Durante un segundo incómodo, ambos hechos son ciertos a la vez.");
add("Mirai never accuses them. She changes one question, then one route detail, then watches the answer arrive half a beat too late. By the time she acts, she has enough to expose the substitution without pretending she knows who is underneath it.","Mirai nunca acusa. Cambia una pregunta, luego un detalle de la ruta, y observa cómo la respuesta llega medio instante tarde. Cuando actúa, tiene suficiente para exponer la sustitución sin fingir que sabe quién hay debajo.");
add("The instructor waits until Mirai has reconstructed the route herself. Protection and identification turned out to be two different jobs.","El instructor espera hasta que Mirai reconstruye la ruta por sí misma. Proteger e identificar resultaron ser dos trabajos distintos.");
add("You kept your client alive. Next time, make sure the client is the person you were assigned.","Mantuviste con vida a tu cliente. La próxima vez, asegúrate de que sea la persona que te asignaron.");

// Mirai final shortcut Battle causality / victory continuity.
add("The Traveller stops at the next turn.\n\nNot because he is checking the way.\n\nHe turns around and waits for Mirai to catch up.","El Viajero se detiene en el siguiente giro.\n\nNo porque esté comprobando el camino.\n\nSe da la vuelta y espera a que Mirai lo alcance.");
add("Why did you stop?","¿Por qué te detuviste?");
add("Because you followed me.\n\nMirai looks back toward the turn behind them.","Porque me seguiste.\n\nMirai mira hacia el giro que dejaron atrás.");
add("You said this was faster.","Dijiste que esto era más rápido.");
add("Your instructor gave me one extra job.\n\nMirai's attention sharpens.","Tu instructora me dio una tarea extra.\n\nLa atención de Mirai se agudiza.");
add("What job?","¿Qué tarea?");
add("See what you do if the person you're escorting stops cooperating.\n\nThe Traveller sets down his bag.\n\nHis stance changes.\n\nNot dramatic.\n\nEnough.","Ver qué haces si la persona a la que escoltas deja de cooperar.\n\nEl Viajero deja la bolsa en el suelo.\n\nSu postura cambia.\n\nNada dramático.\n\nLo suficiente.");
add("This is part of the assessment.","Esto forma parte de la evaluación.");
add("Looks like it.\n\nMirai folds the route map and puts it away.\n\nThen raises her guard.","Eso parece.\n\nMirai dobla el mapa de la ruta y lo guarda.\n\nLuego levanta la guardia.");
add("The Traveller is the first to lower his guard.\n\nMirai does not lower hers immediately.","El Viajero es el primero en bajar la guardia.\n\nMirai no baja la suya de inmediato.");
add("All right.","De acuerdo.");
add("That was your extra job?","¿Esa era tu tarea extra?");
add("See what you'd do.\n\nMirai looks toward the turn behind them.\n\nThen at him.","Ver qué harías.\n\nMirai mira hacia el giro que dejaron atrás.\n\nLuego lo mira a él.");
add("We're done with your route.","Se acabó tu ruta.");
add("Fair.\n\nHe picks up his bag.","Justo.\n\nÉl recoge su bolsa.");
add("Mirai walks first this time.\n\nThe Traveller follows.\n\nShe does not give him the next turn to choose.","Esta vez Mirai camina delante.\n\nEl Viajero la sigue.\n\nElla no le deja elegir el siguiente giro.");
add("They rejoin the checkpoint road beyond the storehouses.\n\nCheckpoint Three is still ahead.\n\nThe escort continues.","Vuelven a la carretera del punto de control más allá de los almacenes.\n\nEl Punto de Control Tres sigue por delante.\n\nLa escolta continúa.");

// Kushina.
add("The practice formula should have gone dark three strokes ago. Instead, chakra crawls past the boundary line and snaps across the courtyard stone toward the student kneeling beside it. The instructor moves—but Kushina is closer.","La fórmula de práctica debería haberse apagado hace tres trazos. En cambio, el chakra rebasa la línea de contención y salta por la piedra del patio hacia el estudiante arrodillado junto a ella. El instructor se mueve, pero Kushina está más cerca.");
add("Fix the formula before it tears itself apart.","Arreglar la fórmula antes de que se desgarre por completo.");
add("Get the student out first.","Sacar primero al estudiante.");
add("Close the broken boundary around the leak.","Cerrar el límite roto alrededor de la fuga.");
add("Move the damned scroll somewhere empty.","Mover el maldito pergamino a un lugar vacío.");

// Kurenai.
add("A brass bell hangs from the instructor's belt. No weapons. No spectators. One rule. “Take it.”","Una campana de latón cuelga del cinturón del instructor. Sin armas. Sin espectadores. Una regla. “Tómala.”");
add("Kurenai watches the instructor's eyes instead of the bell. If he believes the first lie, the second one will not need to be bigger—only better placed.","Kurenai observa los ojos del instructor en vez de la campana. Si cree la primera mentira, la segunda no tendrá que ser mayor, solo estar mejor colocada.");
add("Give him a Kurenai he can see.","Darle una Kurenai que pueda ver.");
add("Hide the real movement behind the obvious one.","Ocultar el movimiento real detrás del evidente.");
add("Make distance lie.","Hacer que la distancia mienta.");
add("Let him believe she came straight at him.","Dejar que crea que ella fue directamente hacia él.");
add("His eyes follow the false Kurenai exactly where she wanted them. The question is whether she spends that belief now.","Sus ojos siguen a la Kurenai falsa exactamente donde ella quería. La pregunta es si aprovecha esa creencia ahora.");
add("The instructor tracks the movement he can see. The real movement stays somewhere else.","El instructor sigue el movimiento que puede ver. El movimiento real permanece en otro lugar.");
add("For one beat, the bell looks unguarded enough to be real.","Durante un instante, la campana parece lo bastante desprotegida como para ser real.");
add("The distance between Kurenai and the bell stops agreeing with what the instructor thinks he saw.","La distancia entre Kurenai y la campana deja de coincidir con lo que el instructor cree haber visto.");
add("He starts to dismiss the attempt. That certainty is another surface she can use.","Empieza a descartar el intento. Esa certeza es otra superficie que ella puede usar.");
add("He sees exactly what she offered him: a clumsy direct approach.","Ve exactamente lo que ella le ofreció: un enfoque directo y torpe.");
add("He believes he has caught her. Kurenai lets the belief settle before touching it.","Cree que la ha atrapado. Kurenai deja que esa creencia se asiente antes de tocarla.");
add("The illusion peels away in the order Kurenai built it. For a moment the courtyard contains the bell, the instructor, and the version of the exchange he thought happened. Then only the real positions remain.","La ilusión se desprende en el orden en que Kurenai la construyó. Durante un momento, el patio contiene la campana, al instructor y la versión del intercambio que él creyó que ocurrió. Luego solo quedan las posiciones reales.");
add("Genjutsu isn't making someone see something strange. It's deciding which part of reality they stop checking.","Genjutsu no consiste en hacer que alguien vea algo extraño. Consiste en decidir qué parte de la realidad deja de comprobar.");

// Kurenai — 2026-09-29 native benchmark expansion + female-instructor successor.
add("Most of the Academy has already emptied out.\n\nKurenai is still in the training courtyard.\n\nThe instructor is putting away practice markers near the far wall.\n\nA small bell hangs from one hand.\n\nKurenai notices it before the instructor notices her watching.","La mayor parte de la Academia ya se ha vaciado.\n\nKurenai sigue en el patio de entrenamiento.\n\nLa instructora está guardando los marcadores de práctica junto al muro del fondo.\n\nUna pequeña campana cuelga de una mano.\n\nKurenai la nota antes de que la instructora se dé cuenta de que la está observando.");
add("The instructor looks at Kurenai.","La instructora mira a Kurenai.");
add("Kurenai looks at the bell.","Kurenai mira la campana.");
add("The instructor glances down at it.","La instructora baja la mirada hacia ella.");
add("The instructor studies her for a moment.\n\nKurenai waits.\n\nShe does not ask if she is right.\n\nThe instructor finishes putting away the last marker.\n\nThen turns back toward the middle of the courtyard.","La instructora la estudia durante un momento.\n\nKurenai espera.\n\nNo pregunta si tiene razón.\n\nLa instructora termina de guardar el último marcador.\n\nLuego vuelve hacia el centro del patio.");
add("Kurenai follows.\n\nThe instructor raises the bell between two fingers.\n\nIt barely moves.\n\nKurenai watches the bell first.\n\nThen the instructor's hand.\n\nThen her feet.","Kurenai la sigue.\n\nLa instructora levanta la campana entre dos dedos.\n\nApenas se mueve.\n\nKurenai observa primero la campana.\n\nLuego la mano de la instructora.\n\nDespués sus pies.");
add("Kurenai moves first without moving at all.\n\nA second Kurenai breaks toward the bell.","Kurenai se mueve primero sin moverse en absoluto.\n\nUna segunda Kurenai se lanza hacia la campana.");
add("The instructor does not follow it.\n\nHer eyes stay on the patch of empty ground where the real Kurenai thought she had disappeared.","La instructora no la sigue.\n\nSus ojos permanecen en el trozo de suelo vacío donde la Kurenai real creyó haber desaparecido.");
add("The false Kurenai reaches for the bell and comes apart before her fingers close.\n\nThe instructor turns just enough to meet the real approach waiting behind it.\n\nKurenai stops.\n\nThe bell never changes hands.","La Kurenai falsa alcanza la campana y se deshace antes de cerrar los dedos.\n\nLa instructora gira lo suficiente para encontrarse con la aproximación real que esperaba detrás.\n\nKurenai se detiene.\n\nLa campana nunca cambia de manos.");
add("Kurenai leaves the instructor something obvious to watch.\n\nHer real movement goes the other way.","Kurenai deja a la instructora algo evidente que mirar.\n\nSu movimiento real va en la otra dirección.");
add("The instructor turns toward the distraction exactly when Kurenai wants her to.\n\nBy the time she looks back, Kurenai is behind her.\n\nThe bell jingles beside the instructor's ear.","La instructora se vuelve hacia la distracción exactamente cuando Kurenai quiere.\n\nCuando vuelve a mirar, Kurenai está detrás de ella.\n\nLa campana tintinea junto al oído de la instructora.");
add("The instructor glances toward the bell in Kurenai's hand.\n\nThen smiles.\n\nThe sound cuts out.\n\nKurenai looks down.\n\nHer hand is empty.\n\nThe real bell is still hanging from the instructor's fingers.","La instructora mira la campana en la mano de Kurenai.\n\nLuego sonríe.\n\nEl sonido se corta.\n\nKurenai baja la mirada.\n\nSu mano está vacía.\n\nLa campana real sigue colgando de los dedos de la instructora.");
add("That makes it worse.","Eso lo hace peor.");
add("Kurenai gives the instructor the correct direction and the wrong distance.\n\nEvery step toward her lands a little shorter than it should.","Kurenai le da a la instructora la dirección correcta y la distancia equivocada.\n\nCada paso hacia ella cae un poco más corto de lo que debería.");
add("The instructor notices only when Kurenai is already close enough to touch the bell.\n\nShe takes it and retreats.","La instructora solo lo nota cuando Kurenai ya está lo bastante cerca para tocar la campana.\n\nKurenai la toma y retrocede.");
add("Kurenai lets the instructor think she is backing away.\n\nThe instructor's next step commits to where Kurenai should be.\n\nKurenai is somewhere else.\n\nFor the first time, the instructor's expression changes.\n\nOnly slightly.\n\nEnough.","Kurenai deja que la instructora crea que está retrocediendo.\n\nEl siguiente paso de la instructora se compromete con el lugar donde Kurenai debería estar.\n\nKurenai está en otra parte.\n\nPor primera vez cambia la expresión de la instructora.\n\nSolo un poco.\n\nLo suficiente.");
add("Then breath touches the back of Kurenai's shoulder.\n\nThe instructor is behind her.\n\nTwo fingers hook the bell away before Kurenai can turn.","Entonces un aliento roza la parte posterior del hombro de Kurenai.\n\nLa instructora está detrás de ella.\n\nDos dedos enganchan la campana y se la quitan antes de que Kurenai pueda girarse.");
add("Kurenai looks at the empty cord in her hand.","Kurenai mira el cordón vacío en su mano.");
add("Kurenai does something almost insulting.\n\nShe rushes the instructor.\n\nNo clever angle.\n\nNo hidden approach.\n\nNo subtlety.\n\nThe instructor's attention sharpens anyway.","Kurenai hace algo casi insultante.\n\nSe lanza directamente contra la instructora.\n\nSin un ángulo ingenioso.\n\nSin una aproximación oculta.\n\nSin sutileza.\n\nAun así, la atención de la instructora se agudiza.");
add("The instructor catches Kurenai before she reaches the bell.\n\nHer hand closes around Kurenai's wrist.","La instructora atrapa a Kurenai antes de que alcance la campana.\n\nSu mano se cierra alrededor de la muñeca de Kurenai.");
add("The yard bends.\n\nKurenai is standing behind the instructor with the bell between two fingers.","El patio se dobla.\n\nKurenai está detrás de la instructora con la campana entre dos dedos.");
add("The yard bends again.\n\nThe instructor is behind Kurenai now.\n\nThe bell is back in her hand.","El patio vuelve a doblarse.\n\nAhora la instructora está detrás de Kurenai.\n\nLa campana vuelve a estar en su mano.");
add("The yard folds one final time.\n\nThey are both standing where the exercise began.\n\nSame distance.\n\nSame posture.\n\nSame quiet courtyard.\n\nExcept Kurenai is holding the bell.\n\nShe looks down at it once.\n\nThen at the instructor.","El patio se pliega una última vez.\n\nLas dos están de pie donde comenzó el ejercicio.\n\nLa misma distancia.\n\nLa misma postura.\n\nEl mismo patio silencioso.\n\nExcepto que Kurenai sostiene la campana.\n\nLa mira una vez.\n\nLuego mira a la instructora.");
add("The instructor exhales through her nose.\n\nNot quite a laugh.","La instructora exhala por la nariz.\n\nNo llega a ser una risa.");
add("Kurenai looks once at the place her false approach disappeared.","Kurenai mira una vez el lugar donde desapareció su aproximación falsa.");
add("Kurenai's mouth tightens.\n\nFair.\n\nAnnoying.\n\nFair.","Kurenai aprieta la boca.\n\nJusto.\n\nMolesto.\n\nJusto.");
add("Kurenai glances at the bell.","Kurenai mira de reojo la campana.");
add("The instructor looks at the bell in Kurenai's hand.\n\nThis time she does not reach for it.","La instructora mira la campana en la mano de Kurenai.\n\nEsta vez no intenta recuperarla.");
add("Kurenai smiles.","Kurenai sonríe.");
add("The instructor taps the bell once.","La instructora toca la campana una vez.");
add("Kurenai looks at the bell.\n\nThen at the instructor.\n\nShe does not answer immediately.","Kurenai mira la campana.\n\nLuego a la instructora.\n\nNo responde de inmediato.");
add("The exercise is over.\n\nThe uncertainty takes a little longer to leave.","El ejercicio ha terminado.\n\nLa incertidumbre tarda un poco más en irse.");
add("The instructor starts gathering the last practice markers.\n\nKurenai stays where she is.\n\nHer eyes return to the patch of ground where the false Kurenai appeared.","La instructora empieza a recoger los últimos marcadores de práctica.\n\nKurenai permanece donde está.\n\nSus ojos vuelven al lugar donde apareció la Kurenai falsa.");
add("The instructor looks toward the empty Academy building.","La instructora mira hacia el edificio vacío de la Academia.");
add("Kurenai does not look pleased.\n\nShe looks at the bell again.","Kurenai no parece contenta.\n\nVuelve a mirar la campana.");
add("Kurenai looks at the hand that held the false bell.\n\nShe opens it.\n\nCloses it.","Kurenai mira la mano que sostuvo la campana falsa.\n\nLa abre.\n\nLa cierra.");
add("The instructor holds up the real bell.","La instructora levanta la campana real.");
add("Kurenai looks at the instructor.","Kurenai mira a la instructora.");
add("Kurenai exhales through her nose.\n\nAnnoyed.\n\nMostly with herself.","Kurenai exhala por la nariz.\n\nMolesta.\n\nSobre todo consigo misma.");
add("The instructor does not answer for her.\n\nKurenai looks at the bell once more.","La instructora no responde por ella.\n\nKurenai vuelve a mirar la campana.");
add("The instructor loops the bell cord around two fingers.\n\nKurenai watches it.","La instructora enrolla el cordón de la campana alrededor de dos dedos.\n\nKurenai lo observa.");
add("Kurenai looks at the distance between them.\n\nThe same distance they started with.","Kurenai mira la distancia entre ambas.\n\nLa misma distancia con la que empezaron.");
add("The instructor lifts an eyebrow.\n\nKurenai means it.","La instructora levanta una ceja.\n\nKurenai habla en serio.");
add("Kurenai is still holding the bell.\n\nThe instructor holds out one hand.","Kurenai todavía sostiene la campana.\n\nLa instructora extiende una mano.");
add("Kurenai looks down at it.\n\nThen hands it over.","Kurenai la mira.\n\nLuego se la entrega.");
add("Kurenai smiles.\n\nSmall.\n\nSatisfied.","Kurenai sonríe.\n\nLevemente.\n\nSatisfecha.");
add("Kurenai picks up her bag.\n\nThe instructor returns the bell to the practice hook.\n\nFor the first time since the exercise started, neither of them is trying to fool the other.","Kurenai recoge su bolsa.\n\nLa instructora devuelve la campana al gancho de práctica.\n\nPor primera vez desde que comenzó el ejercicio, ninguna de las dos intenta engañar a la otra.");
add("Kurenai reaches the courtyard gate.\n\nStops.\n\nLooks back once.\n\nNot at the instructor.\n\nAt the bell.","Kurenai llega a la puerta del patio.\n\nSe detiene.\n\nMira atrás una vez.\n\nNo a la instructora.\n\nA la campana.");
add("The instructor looks over.","La instructora mira hacia ella.");
add("Kurenai nods.\n\nThen leaves.","Kurenai asiente.\n\nLuego se va.");
add("Kurenai leaves with her hands in her pockets.\n\nThe false bell is gone.\n\nShe remembers exactly how real it felt.","Kurenai se va con las manos en los bolsillos.\n\nLa campana falsa ha desaparecido.\n\nRecuerda exactamente lo real que pareció.");
add("Then she leaves.\n\nNo explanation needed.","Luego se va.\n\nNo hace falta ninguna explicación.");
add("She looks back.","Ella mira atrás.");
add("The instructor smiles.\n\nKurenai leaves.","La instructora sonríe.\n\nKurenai se va.");
add("You can go home.","Puedes irte a casa.");
add("You said there might be another exercise.","Dijiste que quizá habría otro ejercicio.");
add("I said there might be.","Dije que quizá lo habría.");
add("And now you're holding that.","Y ahora estás sosteniendo eso.");
add("You think the bell is the exercise?","¿Crees que la campana es el ejercicio?");
add("I think you want me looking at it.","Creo que quieres que la mire.");
add("Come here.","Ven aquí.");
add("That's all?","¿Eso es todo?");
add("If you need more instructions, you may already have a problem.","Si necesitas más instrucciones, quizá ya tengas un problema.");
add("Too early.","Demasiado pronto.");
add("Looking for this?","¿Buscas esto?");
add("Better.","Mejor.");
add("Head-on?","¿De frente?");
add("A strong attempt.","Un buen intento.");
add("You sound disappointed.","Pareces decepcionada.");
add("I said strong.","Dije que fue bueno.");
add("Got you.","Te tengo.");
add("Have you?","¿Ah, sí?");
add("Yes.","Sí.");
add("You were saying?","¿Qué decías?");
add("You gave me the illusion before you gave me a reason to believe it.","Me diste la ilusión antes de darme una razón para creerla.");
add("I showed you the trick.","Te enseñé el truco.");
add("Exactly.","Exactamente.");
add("You made me believe you had the bell.","Me hiciste creer que tenías la campana.");
add("For a second.","Por un segundo.");
add("And then you believed it too.","Y luego tú también te lo creíste.");
add("You moved where I thought you couldn't.","Te moviste donde pensé que no podías.");
add("Long enough to take it.","El tiempo suficiente para tomarla.");
add("Not long enough to keep it.","No el suficiente para conservarla.");
add("Next time.","La próxima vez.");
add("You kept track of the real one.","No perdiste de vista la verdadera.");
add("So did you.","Tú tampoco.");
add("Eventually.","Al final.");
add("Genjutsu isn't only making somebody believe something false.","El Genjutsu no consiste solo en hacer que alguien crea algo falso.");
add("It's knowing what stays true after both of you start lying.","Consiste en saber qué sigue siendo verdad después de que las dos empiecen a mentir.");
add("Something else?","¿Algo más?");
add("I want another try.","Quiero intentarlo otra vez.");
add("Today?","¿Hoy?");
add("I thought I had it.","Creí que la tenía.");
add("You did.","La tenías.");
add("Just not this one.","Pero no esta.");
add("I stopped checking.","Dejé de comprobarlo.");
add("I won't next time.","La próxima vez no lo haré.");
add("I did take it.","Sí la tomé.");
add("Then you took it back.","Y luego me la quitaste.");
add("Also true.","También es verdad.");
add("Next time you don't get it back.","La próxima vez no la recuperas.");
add("Bell.","La campana.");
add("Same exercise tomorrow?","¿El mismo ejercicio mañana?");
add("Wouldn't be much of an exercise if I told you.","No sería gran cosa como ejercicio si te lo dijera.");
add("Good.","Bien.");
add("Don't make it easier tomorrow.","No lo hagas más fácil mañana.");
add("Wasn't planning to.","No pensaba hacerlo.");
add("Still thinking about it?","¿Sigues pensando en eso?");
add("Change the trick.","Cambia el truco.");
add("SEND A FALSE KURENAI","ENVIAR UNA KURENAI FALSA");
add("HIDE MY REAL MOVEMENT","OCULTAR MI MOVIMIENTO REAL");
add("DISTORT HER SENSE OF DISTANCE","DISTORSIONAR SU SENTIDO DE LA DISTANCIA");
add("MAKE THE DIRECT APPROACH LOOK REAL","HACER QUE EL ATAQUE DIRECTO PAREZCA REAL");
add("Sent a false Kurenai at the bell.","Envió una Kurenai falsa hacia la campana.");
add("Hid the movement that actually mattered.","Ocultó el movimiento que realmente importaba.");
add("Distorted the instructor's sense of distance.","Distorsionó el sentido de la distancia de la instructora.");
add("Made the direct approach look real.","Hizo que el ataque directo pareciera real.");
add("The instructor read the first deception before Kurenai could create a reversal.","La instructora leyó el primer engaño antes de que Kurenai pudiera crear una inversión.");
add("Kurenai deceived the instructor, then trusted the false bell herself.","Kurenai engañó a la instructora y luego ella misma confió en la campana falsa.");
add("Kurenai took the bell before the instructor recovered and took it back.","Kurenai tomó la campana antes de que la instructora se recuperara y la recuperara.");
add("Kurenai held the real bell when the final illusion layer cleared.","Kurenai sostenía la campana real cuando se disipó la última capa de ilusión.");

// Iwabee.
add("Make it usable.","Haz que sea utilizable.");
add("Half the training ground has slumped after a failed Earth Release exercise. One lane is cracked, one wall is leaning and everyone has spent five minutes explaining why it is somebody else's fault. Iwabee looks at the ground once. Written tests take him forever. This does not.","La mitad del campo de entrenamiento se ha hundido tras un ejercicio fallido de Elemento Tierra. Un carril está agrietado, un muro se inclina y todos llevan cinco minutos explicando por qué es culpa de otro. Iwabee mira el suelo una vez. Los exámenes escritos le llevan una eternidad. Esto no.");
add("The Rogue Genin glances from Iwabee to the open route. The training problem just became somebody else's real problem too.","El Genin renegado mira de Iwabee a la ruta abierta. El problema de entrenamiento acaba de convertirse también en el problema real de otra persona.");
add("Iwabee looks from the repaired ground to the mess the unexpected Genin left behind. What part of the assessment matters to him?","Iwabee mira del terreno reparado al desastre que dejó el Genin inesperado. ¿Qué parte de la evaluación le importa?");
add("Iwabee looks back once at the ground he repaired and at whatever his choice about the Rogue Genin left behind, then shoulders past the edge of the training yard.","Iwabee mira una vez atrás al terreno que reparó y a lo que haya dejado su elección sobre el Genin renegado, luego sale del campo de entrenamiento.");

// Metal Lee.
add("Metal is good when nobody is watching. His feet land where he wants them. His breathing stays measured. The training post shudders on the final strike and Metal immediately resets his stance to do it again. Then someone claps from behind him.","Metal es bueno cuando nadie lo observa. Sus pies caen donde quiere. Su respiración se mantiene medida. El poste de entrenamiento tiembla con el golpe final y Metal reajusta de inmediato su postura para repetirlo. Entonces alguien aplaude detrás de él.");
add("The Genin who saw him grins like the answer is obvious. “Again.”","El Genin que lo vio sonríe como si la respuesta fuera obvia. “Otra vez.”");
add("Spar. If they're watching anyway, make it count.","Combatir. Si de todos modos están mirando, que valga la pena.");
add("Do the combination again on the training dummy.","Repetir la combinación con el muñeco de entrenamiento.");
add("No. End the session here.","No. Terminar la sesión aquí.");
add("The next combination starts clean. Then Metal notices the eyes on him. His shoulder tightens. His heel lands a fraction too wide. The dummy jerks off-line hard enough to become a real problem for the student beside it.","La siguiente combinación empieza limpia. Entonces Metal nota las miradas sobre él. Se le tensa el hombro. El talón cae un poco demasiado abierto. El muñeco se desvía con suficiente fuerza para convertirse en un problema real para el estudiante que está al lado.");
add("Embarrassment can wait. The dummy cannot.","La vergüenza puede esperar. El muñeco no.");
add("Redirect it away from the student.","Desviarlo lejos del estudiante.");
add("Get between them and take the impact.","Interponerse y recibir el impacto.");
add("Break it before it reaches them.","Romperlo antes de que lo alcance.");
add("Metal lowers his hands and ends the session before the watching turns into another performance. The decision stings more than the training did.","Metal baja las manos y termina la sesión antes de que las miradas la conviertan en otra actuación. La decisión duele más que el entrenamiento.");


// Obito.
add("Obito leaves early. Deliberately early. Today is one of the sessions that matters—the kind where nobody can say he only talks about becoming Hokage. He makes it three streets before somebody needs something.","Obito sale temprano. Deliberadamente temprano. Hoy es una de las sesiones que importan, de esas en las que nadie puede decir que solo habla de convertirse en Hokage. Recorre tres calles antes de que alguien necesite algo.");
add("“Hang on. I'll get the other end.”","“Espera. Yo tomo el otro extremo.”");
add("Brace it, free the doorway, keep moving.","Sostenerlo, liberar la puerta y seguir avanzando.");
add("Keep going. Training starts whether he's there or not.","Seguir. El entrenamiento empieza esté él allí o no.");
add("Get every last one before the carts crush them.","Recoger hasta la última antes de que los carros las aplasten.");
add("Clear the lane fast, then run.","Despejar el carril rápido y luego correr.");
add("Keep moving. Somebody else can stop.","Seguir avanzando. Alguien más puede detenerse.");
add("Help search until it's found.","Ayudar a buscar hasta encontrarlo.");
add("Check the obvious drop points on his route.","Revisar los puntos de caída evidentes de su ruta.");
add("Academy staff can handle Academy equipment. Keep going.","El personal de la Academia puede encargarse del equipo de la Academia. Seguir.");
add("Right the cart and rebuild the load.","Enderezar el carro y recomponer la carga.");
add("Clear the dangerous obstruction and move.","Retirar la obstrucción peligrosa y avanzar.");
add("Go around.","Rodear el obstáculo.");
add("Stop it.","Detenerlo.");
add("Get everyone out of its path.","Sacar a todos de su trayectoria.");
add("Keep moving.","Seguir avanzando.");
add("Obito hits the training approach breathing hard but on time. For once, there is nobody to blame, nobody to wait for and no excuse to make. The whole session is still ahead of him.","Obito llega al acceso del entrenamiento respirando con fuerza, pero a tiempo. Por una vez no hay nadie a quien culpar, nadie a quien esperar ni excusa que dar. Toda la sesión sigue por delante.");
add("Obito reaches the training approach later than he planned. The session is already underway; what remains must be resolved from the journey time he actually spent, not from whether helping was ‘good’ or ‘bad’.","Obito llega al acceso del entrenamiento más tarde de lo planeado. La sesión ya está en marcha; lo que quede debe resolverse a partir del tiempo de viaje que realmente empleó, no de si ayudar fue ‘bueno’ o ‘malo’.");
add("The opening conditioning block has not closed yet. Obito can still make the whole session.","El bloque inicial de acondicionamiento todavía no ha terminado. Obito aún puede completar toda la sesión.");
add("Training is already in progress. The exact remaining blocks must follow the authoritative arrival-time result for this journey.","El entrenamiento ya está en marcha. Los bloques exactos que queden deben seguir el resultado autoritativo de hora de llegada para este viaje.");
add("Obito joins the session: conditioning until his legs burn, weapon fundamentals until his grip stops slipping, Academy-scale Fire work and the Taijutsu closing drill.","Obito se une a la sesión: acondicionamiento hasta que le arden las piernas, fundamentos de armas hasta que deja de resbalarle el agarre, trabajo de Fuego a escala de Academia y el ejercicio final de Taijutsu.");
add("I'm still becoming Hokage.","Todavía voy a convertirme en Hokage.");
add("Next time I get here faster.","La próxima vez llegaré más rápido.");
add("They mattered too.","Ellos también importaban.");
add("Fine. I'll prove it again.","Bien. Lo demostraré otra vez.");
add("Obito looks toward the Hokage Monument for another second, then turns back toward the village. Whatever the journey cost him, the answer in his head is still his.","Obito mira un segundo más hacia el Monumento Hokage y luego vuelve la vista hacia la aldea. Sea cual sea el costo del viaje, la respuesta en su cabeza sigue siendo suya.");

// Dynamic final-Writing render variants. The underlying branch IDs remain in
// 33600; this only enumerates their finite visible sentence outcomes.
const hinH1=[
  ["moved first","se movió primero"],
  ["waited until the opening showed itself","esperó hasta que la apertura se mostró"],
  ["made the opponent come through her guard","obligó al oponente a atravesar su guardia"],
  ["watched the shoulders and feet before committing","observó hombros y pies antes de comprometerse"],
  ["committed to an opening approach","se comprometió con un enfoque inicial"]
];
const hinH2=[
  ["pressed when the advantage appeared","presionó cuando apareció la ventaja"],
  ["redirected the return attack","redirigió el contraataque"],
  ["created distance","creó distancia"],
  ["changed approach when the exchange shifted","cambió de enfoque cuando cambió el intercambio"],
  ["adapted through the middle exchange","se adaptó durante el intercambio intermedio"]
];
const hinH3=[
  ["committed to the strike","se comprometió con el golpe"],
  ["countered","contraatacó"],
  ["stayed patient","mantuvo la paciencia"],
  ["trusted what she had observed","confió en lo que había observado"],
  ["made the final decision","tomó la decisión final"]
];
for(const a of hinH1)for(const b of hinH2)for(const c of hinH3)add(
  `The instructor stops the exchange, corrects Hinata's footing and makes her repeat the decisive moment once. She ${a[0]}, ${b[0]}, then ${c[0]}. No speech. Just: “Again.” Hinata resets without looking away.`,
  `El instructor detiene el intercambio, corrige la posición de los pies de Hinata y le hace repetir una vez el momento decisivo. Ella ${a[1]}, ${b[1]} y luego ${c[1]}. Sin discurso. Solo: “Otra vez.” Hinata vuelve a colocarse sin apartar la mirada.`
);
const izRoutes=[
  ["the longer river route","la ruta más larga del río"],
  ["the stronger trail that turned false","el rastro más fuerte que resultó ser falso"],
  ["the interruption she chose to answer","la interrupción a la que decidió responder"],
  ["the extraction route she predicted","la ruta de extracción que predijo"],
  ["the route she committed to","la ruta con la que se comprometió"]
];
for(const route of izRoutes)add(
  `By the time the instructor calls the exercise, Wasabi has an answer—and a trail of reasons behind it. She has to account for ${route[0]}: what she actually saw, what she assumed and what happened while the target kept moving.`,
  `Cuando el instructor da por terminado el ejercicio, Wasabi tiene una respuesta y un rastro de razones detrás. Tiene que explicar ${route[1]}: lo que realmente vio, lo que supuso y lo que ocurrió mientras el objetivo seguía moviéndose.`
);
const mirDetails=[
  ["The clothing no longer fits the country they described.","La ropa ya no encaja con el país que describió."],
  ["The route no longer fits the route they described.","La ruta ya no encaja con la que describió."],
  ["A family detail comes back differently.","Un detalle familiar vuelve de forma distinta."],
  ["A detail about the trip to Konoha comes back differently.","Un detalle sobre el viaje a Konoha vuelve de forma distinta."],
  ["One small detail refuses to fit.","Un pequeño detalle se niega a encajar."]
];
for(const detail of mirDetails)add(
  `Later, one small detail refuses to fit. Then another. ${detail[0]} Nothing proves anything yet. It is simply wrong enough to stay in Mirai's head.`,
  `Más tarde, un pequeño detalle se niega a encajar. Luego otro. ${detail[1]} Todavía nada demuestra nada. Simplemente está lo bastante mal como para quedarse en la cabeza de Mirai.`
);
const mirReactions=[
  ["The new answer gives Mirai another detail to compare.","La nueva respuesta le da a Mirai otro detalle que comparar."],
  ["She keeps escort formation and waits for the next contradiction.","Mantiene la formación de escolta y espera la siguiente contradicción."],
  ["The unannounced route change produces a reaction she can actually observe.","El cambio de ruta sin aviso produce una reacción que sí puede observar."],
  ["Mirai keeps watching.","Mirai sigue observando."]
];
for(const reaction of mirReactions)add(
  `Suspicion has become a pattern. It still is not proof. ${reaction[0]}`,
  `La sospecha se ha convertido en un patrón. Aún no es una prueba. ${reaction[1]}`
);
const iwaTerrains=[
  ["The collapsed section heaves upward and locks into a usable shelf.","La sección colapsada se eleva y se fija formando una plataforma utilizable."],
  ["The broken ground settles under his Earth Release until the lane lies flat again.","El terreno roto se asienta bajo su Elemento Tierra hasta que el carril vuelve a quedar plano."],
  ["Stone rises into a stable path through the damaged section.","La piedra se eleva formando un camino estable a través de la sección dañada."],
  ["The weakest section thickens and braces against the damaged ground around it.","La sección más débil se engrosa y se refuerza contra el terreno dañado que la rodea."],
  ["The damaged ground changes under Iwabee's Earth Release.","El terreno dañado cambia bajo el Elemento Tierra de Iwabee."]
];
for(const terrain of iwaTerrains)add(
  `${terrain[0]} Then something underneath the collapsed edge moves. A Genin in travel-stained gear rolls out of the newly exposed hollow and freezes when he sees the Academy group. He was hiding here. He was not part of the lesson.`,
  `${terrain[1]} Entonces algo se mueve bajo el borde colapsado. Un Genin con ropa marcada por el viaje sale rodando del hueco recién expuesto y se queda inmóvil al ver al grupo de la Academia. Estaba escondido aquí. No formaba parte de la lección.`
);
const metalResponses=[
  ["The student is clear of the dummy's path because Metal chose to redirect it.","El estudiante queda fuera de la trayectoria del muñeco porque Metal decidió desviarlo."],
  ["Metal put himself between the student and the impact.","Metal se interpuso entre el estudiante y el impacto."],
  ["The dummy never reaches the student; Metal chose to break it first.","El muñeco nunca llega al estudiante; Metal decidió romperlo primero."]
];
for(const response of metalResponses)add(
  `${response[0]} When the yard settles, Metal is still thinking about the first combination—the one he landed clean before anyone clapped.`,
  `${response[1]} Cuando el patio se calma, Metal sigue pensando en la primera combinación, la que ejecutó limpiamente antes de que nadie aplaudiera.`
);
add("Metal leaves with the private session and the moment he backed out both still sitting in his head. Neither one disappears because the other happened.","Metal se marcha con la sesión privada y el momento en que se retiró todavía presentes en su cabeza. Ninguno desaparece porque el otro haya ocurrido.");

const en={},es={};
for(let i=0;i<pairs.length;i++){
  const key=`issue190.finalwriting.${String(i+1).padStart(3,"0")}`;
  en[key]=pairs[i][0];es[key]=pairs[i][1];
}
const enResult=core.registerLocaleMessages("en",en);
const esResult=core.registerLocaleMessages("es-419",es);
const glossaryFailures=[];
for(const [source,translated] of pairs){const check=core.validateProtectedTerms(source,translated);if(!check.success)glossaryFailures.push({source,missing:check.missing});}
const sourceTexts=Object.freeze(pairs.map(row=>row[0]));
function diagnostics(){
  const checks={
    englishRegistered:enResult&&enResult.success===true&&enResult.count===pairs.length,
    spanishRegistered:esResult&&esResult.success===true&&esResult.count===pairs.length,
    substantialFinalWritingCoverage:pairs.length>=200,
    glossaryClean:glossaryFailures.length===0,
    hinataDynamicCovered:sourceTexts.some(text=>text.startsWith("The instructor stops the exchange, corrects Hinata's footing")),
    wasabiDynamicCovered:sourceTexts.some(text=>text.startsWith("By the time the instructor calls the exercise, Wasabi has an answer")),
    miraiDynamicCovered:sourceTexts.some(text=>text.startsWith("Later, one small detail refuses to fit"))&&sourceTexts.some(text=>text.startsWith("Suspicion has become a pattern")),
    iwabeeDynamicCovered:sourceTexts.some(text=>text.includes("Then something underneath the collapsed edge moves.")),
    metalDynamicCovered:sourceTexts.some(text=>text.includes("When the yard settles, Metal is still thinking")),
    obitoFinalCovered:sourceTexts.includes("Obito looks toward the Hokage Monument for another second, then turns back toward the village. Whatever the journey cost him, the answer in his head is still his."),
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
  return{patchId:PATCH_ID,pass:failed.length===0,checks,failed,pairCount:pairs.length,glossaryFailures:[...glossaryFailures],browserGoldenClaimed:false};
}
globalThis.SC_ALPHA_LOCALISATION_FINAL_WRITING_35520=Object.freeze({patchId:PATCH_ID,pairCount:pairs.length,sourceTexts,diagnostics,browserGoldenClaimed:false});
try{core.applyDocument();}catch(_error){}
})();
