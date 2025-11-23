import React from "react";
import styled from "styled-components";
import Image1 from "../../assets/image1.webp";
import Image2 from "../../assets/image2.png";
import Image3 from "../../assets/image3.png";
import Image4 from "../../assets/image4.png";

const Container = styled.div`
  background: #f5f5f5;
  min-height: 100vh;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  direction: rtl;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Grid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    gap: 15px;
  }
`;

const FirstRow = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 1fr 1.5fr;
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;

    /* Reorder cards on mobile - Ad card (3rd in RTL) appears first */
    & > *:nth-child(1) {
      order: 3;
    }
    & > *:nth-child(2) {
      order: 2;
    }
    & > *:nth-child(3) {
      order: 1;
    }
  }
`;

const SecondRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.article`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(248, 196, 79, 0.08);
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(248, 196, 79, 0.1);
  outline: none;

  &:focus {
    outline: none;
  }
`;

const CardImage = styled.div`
  width: 100%;
  height: 200px;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(248, 196, 79, 0.08) 100%
    );
  }
`;

const FeaturedCardImage = styled(CardImage)`
  height: 450px;

  @media (max-width: 768px) {
    height: 250px;
  }
`;

const CardContent = styled.div`
  padding: 20px 15px;
  flex: 1;
  display: flex;
  flex-direction: column;
  text-align: right;
`;

const Category = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: #d4a944;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
  display: inline-block;
  background: rgba(248, 196, 79, 0.1);
  padding: 4px 12px;
  border-radius: 16px;
  align-self: flex-end;
`;

const CardTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: #2c3e50;
  line-height: 1.4;
  margin: 0 0 12px 0;
  flex: 1;
  transition: color 0.2s ease;
`;

const CardMeta = styled.div`
  font-size: 13px;
  color: #666;
  margin-top: auto;
`;

const NewsCard = styled(Card)`
  background: linear-gradient(135deg, #f8c44f 0%, #f5b93a 100%);
  border: none;
`;

const NewsHeader = styled.div`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 16px 24px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-align: right;
  backdrop-filter: blur(10px);
`;

const NewsContent = styled.div`
  padding: 24px;
  text-align: right;
`;

const NewsItem = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);

  &:last-child {
    border-bottom: none;
  }
`;

const NewsTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: white;
  margin: 0 0 8px 0;
  line-height: 1.4;
`;

const NewsMeta = styled.div`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 4px;
`;

const NewsTime = styled.span`
  color: rgba(255, 255, 255, 0.8);
  font-size: 13px;
  background: rgba(255, 255, 255, 0.2);
  padding: 2px 8px;
  border-radius: 12px;
  display: inline-block;
`;

const ReadMoreButton = styled.button`
  background: white;
  border: 2px solid white;
  color: #d4a944;
  padding: 12px 24px;
  border-radius: 24px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  margin-right: auto;
  outline: none;

  &:focus {
    outline: none;
  }
`;

const AdCard = styled(Card)`
  background: linear-gradient(135deg, #f8c44f 0%, #f5b93a 100%);
  justify-content: space-between;
  text-align: center;
  padding: 20px 15px;
  min-height: 100%;
  border: none;
`;

const AdImage = styled.div`
  width: 100%;
  height: 400px;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  border-radius: 12px;
  margin-bottom: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
`;

const AdTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: white;
  line-height: 1.3;
  margin: 0 0 24px 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const AdButton = styled.button`
  background: white;
  border: none;
  color: #d4a944;
  padding: 14px 32px;
  border-radius: 24px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  outline: none;

  &:focus {
    outline: none;
  }
`;

const EditorsCard = styled(Card)`
  background: linear-gradient(135deg, #f8c44f 0%, #f5b93a 100%);
  text-align: center;
  padding: 24px 16px;
  justify-content: center;
  border: none;
`;

const EditorsTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: white;
  margin: 0 0 8px 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const EditorsSubtitle = styled.p`
  font-size: 15px;
  color: rgba(255, 255, 255, 0.95);
  margin: 0 0 20px 0;
  font-weight: 500;
`;

const EditorButton = styled.button`
  background: white;
  border: 2px solid white;
  color: #d4a944;
  padding: 10px 20px;
  border-radius: 24px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  margin: 6px 0;
  width: 100%;
  max-width: 280px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  outline: none;

  &:focus {
    outline: none;
  }
`;

const Publish = () => {
  return (
    <Container>
      <Grid>
        {/* FIRST ROW - 3 columns (reversed order for RTL) */}
        <FirstRow>
          {/* Ad Card */}
          <AdCard>
            <div>
              <AdImage src={Image1} />
              <AdTitle>
                PsA and Your Life: A Guide to Your Daily Well-Being
              </AdTitle>
            </div>
            <AdButton>اقرأ المزيد</AdButton>
          </AdCard>

          {/* News and Trending Card */}
          <NewsCard>
            <NewsHeader>الأخبار والشائع</NewsHeader>
            <NewsContent>
              <NewsItem>
                <NewsTitle>
                  7 إيجابيات وسلبيات لتناول ألواح البروتين يوميًا
                </NewsTitle>
                <NewsMeta>مراجعة طبية بواسطة جوناثان بورتيل، RDN</NewsMeta>
                <NewsTime>منذ ساعة</NewsTime>
              </NewsItem>
              <NewsItem>
                <NewsTitle>
                  ماذا يحدث لتعافي العضلات والنوم عند تناول حمامات المغنيسيوم
                </NewsTitle>
                <NewsMeta>مراجعة طبية بواسطة جوناثان بورتيل، RDN</NewsMeta>
                <NewsTime>منذ ساعة</NewsTime>
              </NewsItem>
              <NewsItem>
                <NewsTitle>
                  أفضل طريقة لطهي البروكلي للحصول على أقصى قدر من مضادات الأكسدة
                </NewsTitle>
                <NewsMeta>مراجعة طبية بواسطة إليزابيث بارنز، RDN</NewsMeta>
                <NewsTime>منذ ساعة</NewsTime>
              </NewsItem>
              <NewsItem>
                <NewsTitle>ماذا يحدث لجسمك عند تناول البرقوق بانتظام</NewsTitle>
                <NewsMeta>مراجعة طبية بواسطة كارينا تولنتينو، RD</NewsMeta>
                <NewsTime>منذ ساعتين</NewsTime>
              </NewsItem>
              <ReadMoreButton>
                <span>←</span> اقرأ المزيد من الأخبار
              </ReadMoreButton>
            </NewsContent>
          </NewsCard>

          {/* Main Featured Article */}
          <Card>
            <FeaturedCardImage src={Image3} />
            <CardContent>
              <Category>أخبار صحية</Category>
              <CardTitle>دليلك الكامل لعيد شكر صديق لمرضى السكري</CardTitle>
              <CardMeta>بقلم ستيفاني براون</CardMeta>
            </CardContent>
          </Card>
        </FirstRow>

        {/* SECOND ROW - 4 columns (reversed order for RTL) */}
        <SecondRow>
          {/* Editors' Picks Card */}
          <EditorsCard>
            <div>
              <EditorsTitle>اختيارات المحررين</EditorsTitle>
              <EditorsSubtitle>
                محتوى منسق حول المواضيع التي تهمك
              </EditorsSubtitle>
            </div>
            <div>
              <EditorButton>الماموجرام منخفض التكلفة</EditorButton>
              <EditorButton>ارتفاع ضغط الدم والمغنيسيوم</EditorButton>
              <EditorButton>الأطعمة الغنية بالبروتين</EditorButton>
              <EditorButton>الإنفلونزا: يومًا بيوم</EditorButton>
            </div>
          </EditorsCard>

          {/* Skin Health Card */}
          <Card>
            <CardImage src={Image2} />
            <CardContent>
              <Category>صحة البشرة</Category>
              <CardTitle>لماذا بشرتي جافة جدًا حتى عند الترطيب؟</CardTitle>
              <CardMeta>مراجعة طبية بواسطة ليه أنسل، MD</CardMeta>
            </CardContent>
          </Card>

          {/* Supplements Card */}
          <Card>
            <CardImage src={Image3} />
            <CardContent>
              <Category>المكملات الغذائية</Category>
              <CardTitle>ما تحتاج معرفته عن فوائد الإشنسا</CardTitle>
              <CardMeta>مراجعة طبية بواسطة ماري تشوي، PharmD</CardMeta>
            </CardContent>
          </Card>

          {/* Cold & Flu Card */}
          <Card>
            <CardImage src={Image4} />
            <CardContent>
              <Category>نزلات البرد والإنفلونزا</Category>
              <CardTitle>مراحل نزلة البرد: كم تستمر أعراض البرد؟</CardTitle>
              <CardMeta>مراجعة طبية بواسطة بريان ويتشلر، DO</CardMeta>
            </CardContent>
          </Card>
        </SecondRow>
      </Grid>
    </Container>
  );
};

export default Publish;
