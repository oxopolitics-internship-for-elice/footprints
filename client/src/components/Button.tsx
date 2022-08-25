type MiniOxButtonsForCardProps = {
  cardId: string;
  isDetailPage?: boolean;

  id?: string;
  cardType?: CardType;
  fillColor?: string;
};

export default function MiniOxButtonsForCard({
  cardId,
  isDetailPage,
  cardType,
  fillColor = '#fffff',
}: MiniOxButtonsForCardProps) {
  const { currentUserId, isVerifiedUser } =
    useRecoilValue(currentUserDataState);

  const [cardAnswer, setCardAnswer] = useState<CardAnswerSchema>();

  const [hasAnsweredQuestion, setHasAnsweredQuestion] =
    useState<boolean>(false);

  const [requestedAnswer, setRequestedAnswer] = useState(cardAnswer?.answer);

  const card = useFirestoreLiveDocument<CardSchema>(
    FirestoreCollection.CARDS,
    cardId,
  );

  const { displayRankOfAnsweredQuestion, currentUserRankOfAnsweredQuestion } =
    useDisplayAnswerSnackbar({
      cardId,
      cardAnswer,
      currentUserId,
    });

  useEffect(() => {
    const unsubscriber = onSnapshot(
      doc(
        collection(firestore, FirestoreCollection.CARD_ANSWERS),
        currentUserId + cardId,
      ),
      snapshot => setCardAnswer(parseDoc(snapshot)),
    );

    return () => unsubscriber();
  }, [currentUserId, cardId]);

  useEffect(() => {
    if (cardAnswer?.answer) {
      setRequestedAnswer(cardAnswer?.answer);
    }
  }, [cardAnswer]);

  const updateVote = (answer: string) => {
    if (!answer || !currentUserId) {
      return;
    }

    if (answer === requestedAnswer) {
      // TODO: Prompt UI to tell User already requested same vote.
      return;
    }

    setRequestedAnswer(answer);

    addAnswer(cardId, currentUserId, answer);

    setHasAnsweredQuestion(true);
  };

  useEffect(() => {
    if (
      hasAnsweredQuestion &&
      currentUserRankOfAnsweredQuestion &&
      cardType === CardType.TOPIC
    ) {
      displayRankOfAnsweredQuestion();
    }
  }, [currentUserRankOfAnsweredQuestion]);

  if (!card) {
    return null;
  }

  return (
    <>
      <div
        css={css`
          width: 100%;
          position: relative;
        `}
      >
        <ButtonOx
          onVote={updateVote}
          answer={cardAnswer?.answer}
          clickable={currentUserVerified}
          disabled={disabled}
          isDetailPage={isDetailPage}
          isLoggedIn={!!currentUserId}
          fillColor={fillColor}
        />
      </div>
    </>
  );
}
